-- Create a new migration file: prisma/migrations/[timestamp]_add_distance_calculation.sql

CREATE OR REPLACE FUNCTION calculate_distance(
  lat1 double precision,
  lon1 double precision,
  lat2 double precision,
  lon2 double precision
)
RETURNS double precision AS $$
DECLARE
  R double precision := 6371; -- Earth's radius in kilometers
  dlat double precision;
  dlon double precision;
  a double precision;
  c double precision;
  d double precision;
BEGIN
  -- Convert latitude and longitude to radians
  dlat := radians(lat2 - lat1);
  dlon := radians(lon2 - lon1);
  lat1 := radians(lat1);
  lat2 := radians(lat2);
  
  -- Haversine formula
  a := (sin(dlat/2))^2 + cos(lat1) * cos(lat2) * (sin(dlon/2))^2;
  c := 2 * asin(sqrt(a));
  d := R * c;
  
  RETURN d;
END;
$$ LANGUAGE plpgsql;