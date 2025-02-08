


// import React, { useState, useEffect } from 'react';
// import { Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
// import { Dialog, DialogContent, DialogTrigger, DialogClose } from '@/components/ui/dialog';
// import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import DatePicker, { registerLocale } from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import { ptBR } from 'date-fns/locale/pt-BR';
// import { 
//   addMonths, 
//   subMonths, 
//   isSameMonth, 
//   startOfMonth, 
//   endOfMonth, 
//   isSameDay,
//   isWithinInterval
// } from 'date-fns';
// import { useUser } from "@/hooks/getUser";

// registerLocale('pt-BR', ptBR);

// interface RentalCardProps {
//   pricePerNight: number;
//   imovelId: string;
// }

// const RentalCard: React.FC<RentalCardProps> = ({ pricePerNight, imovelId }) => {
//   const { user, loading } = useUser();

//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);
//   const [totalNights, setTotalNights] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [isCalendarOpen, setIsCalendarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState<'checkin' | 'checkout'>('checkin');
//   const [leftMonth, setLeftMonth] = useState(new Date());
//   const [rightMonth, setRightMonth] = useState(addMonths(new Date(), 1));
//   const [bookedDates, setBookedDates] = useState<{ start: Date; end: Date }[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleMonthChange = (increment: boolean) => {
//     if (increment) {
//       setLeftMonth(addMonths(leftMonth, 1));
//       setRightMonth(addMonths(rightMonth, 1));
//     } else {
//       setLeftMonth(subMonths(leftMonth, 1));
//       setRightMonth(subMonths(rightMonth, 1));
//     }
//   };

//   const CustomHeader = ({
//     date,
//     decreaseMonth,
//     increaseMonth,
//     prevMonthButtonDisabled,
//     nextMonthButtonDisabled,
//   }: {
//     date: Date;
//     decreaseMonth: () => void;
//     increaseMonth: () => void;
//     prevMonthButtonDisabled: boolean;
//     nextMonthButtonDisabled: boolean;
//   }) => (
//     <div className="flex items-center justify-between px-4 py-2">
//       <span className="text-base font-semibold">
//         {date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
//       </span>
 
//     </div>
//   );

//   const handleClearDates = () => {
//     setStartDate(null);
//     setEndDate(null);
//     setActiveTab('checkin');
//   };

//   useEffect(() => {
//     const fetchBookedDates = async () => {
//       try {
//         const response = await fetch(`/api/aluguel?imovelId=${imovelId}`);
       
//         if (!response.ok) throw new Error('Erro ao buscar datas de aluguel');
//         const data = await response.json();
//         const dates = data.map((aluguel: any) => ({
//           start: new Date(aluguel.checkIn),
//           end: new Date(aluguel.checkOut),
//         }));
//         setBookedDates(dates);
//       } catch (error) {
//         console.error('Erro ao buscar datas de aluguel:', error);
//       }
//     };

//     fetchBookedDates();
//   }, [imovelId]);

//   const isDateBooked = (date: Date) => {
//     return bookedDates.some(booking => 
//       isWithinInterval(date, { start: booking.start, end: booking.end })
//     );
//   };

//   const hasBookedDateInRange = (start: Date, end: Date) => {
//     const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
//     for (let i = 0; i <= days; i++) {
//       const currentDate = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
//       if (isDateBooked(currentDate)) {
//         return true;
//       }
//     }
//     return false;
//   };

//   const handleDateRangeChange = (date: Date | null) => {
//     if (!date) return;

//     if (activeTab === 'checkin') {
//       if (!isDateBooked(date)) {
//         setStartDate(date);
//         setEndDate(null);
//         setActiveTab('checkout');
//       }
//     } else {
//       if (startDate && date >= startDate) {
//         // Check if there are any booked dates in the range
//         if (!hasBookedDateInRange(startDate, date)) {
//           setEndDate(date);
//           setIsCalendarOpen(false);
//         }
//       }
//     }
//   };

//   useEffect(() => {
//     if (startDate && endDate) {
//       let validDays = 0;
//       const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
//       for (let i = 0; i <= days; i++) {
//         const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
//         if (!isDateBooked(currentDate)) {
//           validDays++;
//         }
//       }
      
//       setTotalNights(validDays);
//       setTotalPrice(validDays * pricePerNight);
//     } else {
//       setTotalNights(0);
//       setTotalPrice(0);
//     }
//   }, [startDate, endDate, pricePerNight, bookedDates]);

//   const handleRent = async () => {
//     if (!startDate || !endDate || hasBookedDateInRange(startDate, endDate)) return;
    
//     setIsLoading(true);

//     try {
//       const response = await fetch('/api/aluguel', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           imovelId,
//           inquilinoId: user?.id,
//           checkIn: startDate,
//           checkOut: endDate,
//           periodoAluguel: totalNights,
//           status: 'pendente',
//         }),
//       });

//       if (!response.ok) throw new Error('Erro ao criar aluguel');

//       const data = await response.json();
//       alert('Aluguel criado com sucesso!');
//       setBookedDates([...bookedDates, { start: startDate, end: endDate }]);
//       handleClearDates();
//     } catch (error) {
//       console.error('Erro ao criar aluguel:', error);
//       alert('Erro ao criar aluguel. Tente novamente.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const isDateInRange = (date: Date, ranges: { start: Date; end: Date }[]) => {
//     return ranges.some(range => 
//       isWithinInterval(date, { start: range.start, end: range.end })
//     );
//   };

//   const CustomDatePicker = () => (
//     <div className="flex gap-4">
//       <div className="w-1/2">
//         <DatePicker
//           selected={isSameMonth(leftMonth, startDate || new Date()) ? startDate : null}
//           onChange={handleDateRangeChange}
//           inline
//           locale="pt-BR"
//           minDate={startOfMonth(leftMonth)}
//           maxDate={endOfMonth(leftMonth)}
//           renderCustomHeader={CustomHeader}
//           calendarClassName="custom-airbnb-calendar"
//           openToDate={leftMonth}
//           startDate={startDate}
//           endDate={endDate}
//           selectsStart
//           selectsEnd={false}
//           excludeDates={bookedDates.flatMap(booking => 
//             Array.from(
//               { length: Math.ceil((booking.end.getTime() - booking.start.getTime()) / (1000 * 60 * 60 * 24)) + 1 }, 
//               (_, i) => new Date(booking.start.getTime() + i * 24 * 60 * 60 * 1000)
//             )
//           )}
//           shouldCloseOnSelect={false}
//           monthsShown={1}
//           dayClassName={(date) => {
//             // Only show days of the current month
//             if (date.getMonth() !== leftMonth.getMonth()) {
//               return 'react-datepicker__day react-datepicker__day--outside-month';
//             }

//             let className = 'react-datepicker__day';
            
//             // Booked dates
//             if (isDateInRange(date, bookedDates)) {
//               className += ' booked-date opacity-50 cursor-not-allowed';
//             }
            
//             // Temporary selection range (before saving)
//             if ((startDate && isSameDay(date, startDate)) || 
//                 (endDate && isSameDay(date, endDate))) {
//               className += ' bg-black text-white';
//             }
            
//             // Dates between start and end (if selected)
//             if (startDate && endDate && 
//                 date > startDate && 
//                 date < endDate) {
//               className += ' bg-gray-200';
//             }
            
//             return className;
//           }}
//         />
//       </div>
//       <div className="w-1/2">
//         <DatePicker
//           selected={isSameMonth(rightMonth, endDate || new Date()) ? endDate : null}
//           onChange={handleDateRangeChange}
//           inline
//           locale="pt-BR"
//           minDate={startOfMonth(rightMonth)}
//           maxDate={endOfMonth(rightMonth)}
//           renderCustomHeader={CustomHeader}
//           calendarClassName="custom-airbnb-calendar"
//           openToDate={rightMonth}
//           startDate={startDate}
//           endDate={endDate}
//           selectsEnd
//           selectsStart={false}
//           excludeDates={bookedDates.flatMap(booking => 
//             Array.from(
//               { length: Math.ceil((booking.end.getTime() - booking.start.getTime()) / (1000 * 60 * 60 * 24)) + 1 }, 
//               (_, i) => new Date(booking.start.getTime() + i * 24 * 60 * 60 * 1000)
//             )
//           )}
//           shouldCloseOnSelect={false}
//           monthsShown={1}
//           dayClassName={(date) => {
//             // Only show days of the current month
//             if (date.getMonth() !== rightMonth.getMonth()) {
//               return 'react-datepicker__day react-datepicker__day--outside-month';
//             }

//             let className = 'react-datepicker__day';
            
//             // Booked dates
//             if (isDateInRange(date, bookedDates)) {
//               className += ' booked-date opacity-50 cursor-not-allowed';
//             }
            
//             // Temporary selection range (before saving)
//             if ((startDate && isSameDay(date, startDate)) || 
//                 (endDate && isSameDay(date, endDate))) {
//               className += ' bg-black text-white';
//             }
            
//             // Dates between start and end (if selected)
//             if (startDate && endDate && 
//                 date > startDate && 
//                 date < endDate) {
//               className += ' bg-gray-200';
//             }
            
//             return className;
//           }}
//         />
//       </div>
//     </div>
//   );

//   const formatDateRange = () => {
//     if (!startDate || !endDate) return '';
//     return `${startDate.toLocaleDateString('pt-BR')} - ${endDate.toLocaleDateString('pt-BR')}`;
//   };

//   // Rest of the component remains the same...
  
//   return (
//     <Card className="w-full shadow-lg">
//       <CardHeader className="pb-4 px-6">
//         <div className="text-2xl font-bold">
//           {pricePerNight.toLocaleString('pt-BR', {
//             style: 'currency',
//             currency: 'AOA',
//           })}{' '}
//           <span className="text-sm font-normal">noite</span>
//         </div>
//       </CardHeader>
//       <CardContent className="space-y-4 px-6">
//         <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
//           <div className="grid grid-cols-2 border rounded-lg">
//             <DialogTrigger asChild>
//               <button className="p-3 text-left hover:bg-gray-50 border-r">
//                 <div className="text-xs font-medium">CHECK-IN</div>
//                 <div>{startDate ? startDate.toLocaleDateString() : 'Adicionar data'}</div>
//               </button>
//             </DialogTrigger>
//             <DialogTrigger asChild>
//               <button className="p-3 text-left hover:bg-gray-50">
//                 <div className="text-xs font-medium">CHECKOUT</div>
//                 <div>{endDate ? endDate.toLocaleDateString() : 'Adicionar data'}</div>
//               </button>
//             </DialogTrigger>
//           </div>
//           <DialogContent className="p-4 max-w-3xl min-h-[600px]">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex-1">
//                 {startDate && endDate && (
//                   <div>
//                     <div className="text-lg font-semibold">{totalNights} noites</div>
//                     <div className="text-sm text-gray-600">{formatDateRange()}</div>
//                   </div>
//                 )}
//                 {!startDate && !endDate && (
//                   <div className="text-lg font-semibold">Selecione as datas</div>
//                 )}
//                 {startDate && !endDate && (
//                   <div className="text-lg font-semibold">Selecione a data de checkout</div>
//                 )}
//               </div>
//               <div className="flex items-center gap-2">
//                 <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'checkin' | 'checkout')} className="w-auto">
//                   <TabsList className="p-0 h-auto bg-transparent">
//                     <TabsTrigger
//                       value="checkin"
//                       className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-4 py-2"
//                     >
//                       <div className="text-left">
//                         <div className="text-xs font-medium">CHECK-IN</div>
//                         <div>{startDate ? startDate.toLocaleDateString() : 'Selecionar'}</div>
//                       </div>
//                     </TabsTrigger>
//                     <div className="border-r h-12 mx-2"></div>
//                     <TabsTrigger
//                       value="checkout"
//                       className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-4 py-2"
//                     >
//                       <div className="text-left">
//                         <div className="text-xs font-medium">CHECKOUT</div>
//                         <div>{endDate ? endDate.toLocaleDateString() : 'Selecionar'}</div>
//                       </div>
//                     </TabsTrigger>
//                   </TabsList>
//                 </Tabs>
//               </div>
//             </div>
//             <div className="relative">
//               <Button
//                 onClick={() => handleMonthChange(false)}
//                 variant="ghost"
//                 size="icon"
//                 className="absolute left-4 top-20 z-10 mt-4 hover:bg-black hover:text-white rounded-full transition-colors"
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </Button>
//               <Button
//                 onClick={() => handleMonthChange(true)}
//                 variant="ghost"
//                 size="icon"
//                 className="absolute right-4 top-20 z-10 mt-4 hover:bg-black hover:text-white rounded-full transition-colors"
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </Button>
//               <div className="custom-calendar-wrapper">
//                 <CustomDatePicker />
//               </div>
//             </div>
//             <div className="flex justify-end gap-2 mt-4">
//               <Button variant="outline" size="sm" onClick={handleClearDates}>
//                 Limpar datas
//               </Button>
//               <DialogClose asChild>
//                 <Button size="sm" className="bg-black text-white hover:bg-black/90">
//                   Fechar
//                 </Button>
//               </DialogClose>
//             </div>
//           </DialogContent>
//         </Dialog>

//         <Button
//           className="w-full bg-pink-600 hover:bg-pink-700 text-white"
//           disabled={!startDate || !endDate || isLoading}
//           onClick={handleRent}
//         >
//           {isLoading ? 'Processando...' : `Reservar - ${totalPrice.toLocaleString('pt-BR', {
//             style: 'currency',
//             currency: 'AOA',
//           })}`}
//         </Button>
// {totalNights > 0 && (
//   <div className="space-y-4">
//     <div className="flex justify-between items-center">
//       <div className="underline">
//         {pricePerNight.toLocaleString('pt-BR', {
//           style: 'currency',
//           currency: 'AOA',
//         })}{' '}
//         x {totalNights} noites
//       </div>
//       <div>
//         {(pricePerNight * totalNights).toLocaleString('pt-BR', {
//           style: 'currency',
//           currency: 'AOA',
//         })}
//       </div>
//     </div>

//     <Separator />

//     <div className="flex justify-between items-center font-bold">
//       <div>Total</div>
//       <div>
//         {totalPrice.toLocaleString('pt-BR', {
//           style: 'currency',
//           currency: 'AOA',
//         })}
//       </div>
//     </div>
//   </div>
// )}
//       </CardContent>
//       <style jsx global>{`
//         .custom-calendar-wrapper {
//           width: 100%;
//         }
        
//         .custom-airbnb-calendar {
//           width: 100%;
//           border: none;
//           background: white;
//           min-height: 380px;
//         }

//         .custom-airbnb-calendar .react-datepicker__month-container {
//           float: left;
//           width: 100%;
//         }

//         .custom-airbnb-calendar .react-datepicker__day {
//           margin: 2px;
//           width: 40px;
//           height: 40px;
//           line-height: 40px;
//           border-radius: 0;
//           color: #484848;
//           cursor: pointer;
//         }

//         .custom-airbnb-calendar .react-datepicker__day:hover {
//           background-color: #222222;
//           color: white;
//           border-radius: 0;
//         }

//         .custom-airbnb-calendar .selected-day {
//           background-color: #222222;
//           color: white;
//           border-radius: 0;
//         }

//         .custom-airbnb-calendar .react-datepicker__header {
//           background-color: white;
//           border-bottom: none;
//           padding-top: 1rem;
//         }

//         .custom-airbnb-calendar .react-datepicker__current-month {
//           font-size: 1rem;
//           font-weight: 600;
//           color: #222222;
//           margin-bottom: 1rem;
//         }

//         .custom-airbnb-calendar .react-datepicker__day-names {
//           margin-bottom: 0.5rem;
//         }

//         .custom-airbnb-calendar .react-datepicker__day-name {
//           width: 40px;
//           color: #757575;
//         }

//         .custom-airbnb-calendar .react-datepicker__navigation {
//           display: none;
//         }

//         .custom-airbnb-calendar .react-datepicker__month {
//           margin: 2.5rem 0;
//         }
//         .react-datepicker__day--outside-month {
//           visibility: hidden;
//           pointer-events: none;
//         }

//         .react-datepicker__day.booked-date {
//           cursor: not-allowed;
//           opacity: 0.5;
//           background-color: #f0f0f0;
//           text-decoration: line-through;
//         }

//         .react-datepicker__day.booked-date:hover {
//           background-color: #f0f0f0 !important;
//           color: #999 !important;
//           cursor: not-allowed;
//         }

//         .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range {  
//           background-color: #222222;
//           color: white !important;
//         }
//       `}</style>
//     </Card>
//   );
// };

// export default RentalCard;





import React, { useState, useEffect } from 'react';
import { Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from "sonner";
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from 'date-fns/locale/pt-BR';
import { 
  addMonths, 
  subMonths, 
  isSameMonth, 
  startOfMonth, 
  endOfMonth, 
  isSameDay,
  isWithinInterval
} from 'date-fns';
import { useUser } from "@/hooks/getUser";

registerLocale('pt-BR', ptBR);

interface RentalCardProps {
  pricePerNight: number;
  imovelId: string;
}

const RentalCardValidationData: React.FC<RentalCardProps> = ({ pricePerNight, imovelId }) => {
  const { user, loading } = useUser();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [totalNights, setTotalNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'checkin' | 'checkout'>('checkin');
  const [leftMonth, setLeftMonth] = useState(new Date());
  const [rightMonth, setRightMonth] = useState(addMonths(new Date(), 1));
  const [bookedDates, setBookedDates] = useState<{ start: Date; end: Date }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleMonthChange = (increment: boolean) => {
    if (increment) {
      setLeftMonth(addMonths(leftMonth, 1));
      setRightMonth(addMonths(rightMonth, 1));
    } else {
      setLeftMonth(subMonths(leftMonth, 1));
      setRightMonth(subMonths(rightMonth, 1));
    }
  };

  const CustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: {
    date: Date;
    decreaseMonth: () => void;
    increaseMonth: () => void;
    prevMonthButtonDisabled: boolean;
    nextMonthButtonDisabled: boolean;
  }) => (
    <div className="flex items-center justify-between px-4 py-2">
      <span className="text-base font-semibold">
        {date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
      </span>
    </div>
  );

  const handleClearDates = () => {
    setStartDate(null);
    setEndDate(null);
    setActiveTab('checkin');
  };

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await fetch(`/api/aluguel?imovelId=${imovelId}`);
       
        if (!response.ok) throw new Error('Erro ao buscar datas de aluguel');
        const data = await response.json();
        const dates = data.map((aluguel: any) => ({
          start: new Date(aluguel.checkIn),
          end: new Date(aluguel.checkOut),
        }));
        setBookedDates(dates);
      } catch (error) {
        console.error('Erro ao buscar datas de aluguel:', error);
        toast.error("Não foi possível carregar as datas de aluguel.");
      }
    };

    fetchBookedDates();
  }, [imovelId]);

  const isDateBooked = (date: Date) => {
    return bookedDates.some(booking => 
      isWithinInterval(date, { start: booking.start, end: booking.end })
    );
  };

  const hasBookedDateInRange = (start: Date, end: Date) => {
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    for (let i = 0; i <= days; i++) {
      const currentDate = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
      if (isDateBooked(currentDate)) {
        return true;
      }
    }
    return false;
  };

  const handleDateRangeChange = (date: Date | null) => {
    if (!date) return;

    if (activeTab === 'checkin') {
      if (!isDateBooked(date)) {
        setStartDate(date);
        setEndDate(null);
        setActiveTab('checkout');
      } else {
        toast.info("A data selecionada já está reservada.");
      }
    } else {
      if (startDate && date >= startDate) {
        // Check if there are any booked dates in the range
        if (!hasBookedDateInRange(startDate, date)) {
          setEndDate(date);
          setIsCalendarOpen(false);
        } else {
          toast.warning("Algumas datas no intervalo selecionado já estão reservadas.");
        }
      }
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      let validDays = 0;
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      for (let i = 0; i <= days; i++) {
        const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
        if (!isDateBooked(currentDate)) {
          validDays++;
        }
      }
      
      setTotalNights(validDays);
      setTotalPrice(validDays * pricePerNight);
    } else {
      setTotalNights(0);
      setTotalPrice(0);
    }
  }, [startDate, endDate, pricePerNight, bookedDates]);

  const handleRent = async () => {
    if (!startDate || !endDate || hasBookedDateInRange(startDate, endDate)) {
      toast.warning("Verifique as datas selecionadas. Algumas datas já estão reservadas.");
      return;
    }
    
    setIsLoading(true);

    try {
      const response = await fetch('/api/aluguel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imovelId,
          inquilinoId: user?.id,
          checkIn: startDate,
          checkOut: endDate,
          periodoAluguel: totalNights,
          status: 'pendente',
        }),
      });

      if (!response.ok) throw new Error('Erro ao criar aluguel');

      const data = await response.json();
      
      // Success toast
      setTimeout(() => {
        toast.success(`Reserva criada com sucesso para ${totalNights} noites. Valor total: ${totalPrice.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'AOA',
        })}`, {
          duration: 5000 // Display for 5 seconds
        });
      }, 300);
      //toast("Reserva criada com sucesso para ${totalNights} noites. Valor total");

    //   toast.success(`Reserva criada com sucesso para ${totalNights} noites. Valor total: ${totalPrice.toLocaleString('pt-BR', {
    //     style: 'currency',
    //     currency: 'AOA',
    //   })}`,
    // );

      setBookedDates([...bookedDates, { start: startDate, end: endDate }]);
      handleClearDates();
    } catch (error) {
      console.error('Erro ao criar aluguel:', error);
      
      // Error toast
      toast.error("Não foi possível criar a reserva. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const isDateInRange = (date: Date, ranges: { start: Date; end: Date }[]) => {
    return ranges.some(range => 
      isWithinInterval(date, { start: range.start, end: range.end })
    );
  };

  const CustomDatePicker = () => (
    <div className="flex gap-4">
      <div className="w-1/2">
        <DatePicker
          selected={isSameMonth(leftMonth, startDate || new Date()) ? startDate : null}
          onChange={handleDateRangeChange}
          inline
          locale="pt-BR"
          minDate={startOfMonth(leftMonth)}
          maxDate={endOfMonth(leftMonth)}
          renderCustomHeader={CustomHeader}
          calendarClassName="custom-airbnb-calendar"
          openToDate={leftMonth}
          startDate={startDate}
          endDate={endDate}
          selectsStart
          selectsEnd={false}
          excludeDates={bookedDates.flatMap(booking => 
            Array.from(
              { length: Math.ceil((booking.end.getTime() - booking.start.getTime()) / (1000 * 60 * 60 * 24)) + 1 }, 
              (_, i) => new Date(booking.start.getTime() + i * 24 * 60 * 60 * 1000)
            )
          )}
          shouldCloseOnSelect={false}
          monthsShown={1}
          dayClassName={(date) => {
            // Only show days of the current month
            if (date.getMonth() !== leftMonth.getMonth()) {
              return 'react-datepicker__day react-datepicker__day--outside-month';
            }

            let className = 'react-datepicker__day';
            
            // Booked dates
            if (isDateInRange(date, bookedDates)) {
              className += ' booked-date opacity-50 cursor-not-allowed';
            }
            
            // Temporary selection range (before saving)
            if ((startDate && isSameDay(date, startDate)) || 
                (endDate && isSameDay(date, endDate))) {
              className += ' bg-black text-white';
            }
            
            // Dates between start and end (if selected)
            if (startDate && endDate && 
                date > startDate && 
                date < endDate) {
              className += ' bg-gray-200';
            }
            
            return className;
          }}
        />
      </div>
      <div className="w-1/2">
        <DatePicker
          selected={isSameMonth(rightMonth, endDate || new Date()) ? endDate : null}
          onChange={handleDateRangeChange}
          inline
          locale="pt-BR"
          minDate={startOfMonth(rightMonth)}
          maxDate={endOfMonth(rightMonth)}
          renderCustomHeader={CustomHeader}
          calendarClassName="custom-airbnb-calendar"
          openToDate={rightMonth}
          startDate={startDate}
          endDate={endDate}
          selectsEnd
          selectsStart={false}
          excludeDates={bookedDates.flatMap(booking => 
            Array.from(
              { length: Math.ceil((booking.end.getTime() - booking.start.getTime()) / (1000 * 60 * 60 * 24)) + 1 }, 
              (_, i) => new Date(booking.start.getTime() + i * 24 * 60 * 60 * 1000)
            )
          )}
          shouldCloseOnSelect={false}
          monthsShown={1}
          dayClassName={(date) => {
            // Only show days of the current month
            if (date.getMonth() !== rightMonth.getMonth()) {
              return 'react-datepicker__day react-datepicker__day--outside-month';
            }

            let className = 'react-datepicker__day';
            
            // Booked dates
            if (isDateInRange(date, bookedDates)) {
              className += ' booked-date opacity-50 cursor-not-allowed';
            }
            
            // Temporary selection range (before saving)
            if ((startDate && isSameDay(date, startDate)) || 
                (endDate && isSameDay(date, endDate))) {
              className += ' bg-black text-white';
            }
            
            // Dates between start and end (if selected)
            if (startDate && endDate && 
                date > startDate && 
                date < endDate) {
              className += ' bg-gray-200';
            }
            
            return className;
          }}
        />
      </div>
    </div>
  );

  const formatDateRange = () => {
    if (!startDate || !endDate) return '';
    return `${startDate.toLocaleDateString('pt-BR')} - ${endDate.toLocaleDateString('pt-BR')}`;
  };

  return (
    <>
      <Card className="w-full shadow-lg">
        <CardHeader className="pb-4 px-6">
          <div className="text-2xl font-bold">
            {pricePerNight.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'AOA',
            })}{' '}
            <span className="text-sm font-normal">noite</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 px-6">
          <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <div className="grid grid-cols-2 border rounded-lg">
              <DialogTrigger asChild>
                <button className="p-3 text-left hover:bg-gray-50 border-r">
                  <div className="text-xs font-medium">CHECK-IN</div>
                  <div>{startDate ? startDate.toLocaleDateString() : 'Adicionar data'}</div>
                </button>
              </DialogTrigger>
              <DialogTrigger asChild>
                <button className="p-3 text-left hover:bg-gray-50">
                  <div className="text-xs font-medium">CHECKOUT</div>
                  <div>{endDate ? endDate.toLocaleDateString() : 'Adicionar data'}</div>
                </button>
              </DialogTrigger>
            </div>
            <DialogContent className="p-4 max-w-3xl min-h-[600px]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  {startDate && endDate && (
                    <div>
                      <div className="text-lg font-semibold">{totalNights} noites</div>
                      <div className="text-sm text-gray-600">{formatDateRange()}</div>
                    </div>
                  )}
                  {!startDate && !endDate && (
                    <div className="text-lg font-semibold">Selecione as datas</div>
                  )}
                  {startDate && !endDate && (
                    <div className="text-lg font-semibold">Selecione a data de checkout</div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'checkin' | 'checkout')} className="w-auto">
                    <TabsList className="p-0 h-auto bg-transparent">
                      <TabsTrigger
                        value="checkin"
                        className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-4 py-2"
                      >
                        <div className="text-left">
                          <div className="text-xs font-medium">CHECK-IN</div>
                          <div>{startDate ? startDate.toLocaleDateString() : 'Selecionar'}</div>
                        </div>
                      </TabsTrigger>
                      <div className="border-r h-12 mx-2"></div>
                      <TabsTrigger
                        value="checkout"
                        className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-4 py-2"
                      >
                        <div className="text-left">
                          <div className="text-xs font-medium">CHECKOUT</div>
                          <div>{endDate ? endDate.toLocaleDateString() : 'Selecionar'}</div>
                        </div>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
              <div className="relative">
                <Button
                  onClick={() => handleMonthChange(false)}
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-20 z-10 mt-4 hover:bg-black hover:text-white rounded-full transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleMonthChange(true)}
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-20 z-10 mt-4 hover:bg-black hover:text-white rounded-full transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="custom-calendar-wrapper">
                  <CustomDatePicker />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={handleClearDates}>
                  Limpar datas
                </Button>
                <DialogClose asChild>
                  <Button size="sm" className="bg-black text-white hover:bg-black/90">
                    Fechar
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            className="w-full bg-pink-600 hover:bg-pink-700 text-white"
            disabled={!startDate || !endDate || isLoading}
            onClick={handleRent}
          >
            {isLoading ? 'Processando...' : `Reservar - ${totalPrice.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'AOA',
            })}`}
          </Button>
          {totalNights > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="underline">
                  {pricePerNight.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'AOA',
                  })}{' '}
                  x {totalNights} noites
                </div>
                <div>
                  {(pricePerNight * totalNights).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'AOA',
                  })}
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center font-bold">
                <div>Total</div>
                <div>
                  {totalPrice.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'AOA',
                  })}
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <style jsx global>{`
          .custom-calendar-wrapper {
            width: 100%;
          }
          
          .custom-airbnb-calendar {
            width: 100%;
            border: none;
            background: white;
            min-height: 380px;
          }

          .custom-airbnb-calendar .react-datepicker__month-container {
            float: left;
            width: 100%;
          }

          .custom-airbnb-calendar .react-datepicker__day {
            margin: 2px;
            width: 40px;
            height: 40px;
            line-height: 40px;
            border-radius: 0;
            color: #484848;
            cursor: pointer;
          }

          .custom-airbnb-calendar .react-datepicker__day:hover {
            background-color: #222222;
            color: white;
            border-radius: 0;
          }

          .custom-airbnb-calendar .selected-day {
            background-color: #222222;
            color: white;
            border-radius: 0;
          }

          .custom-airbnb-calendar .react-datepicker__header {
            background-color: white;
            border-bottom: none;
            padding-top: 1rem;
          }

          .custom-airbnb-calendar .react-datepicker__current-month {
            font-size: 1rem;
            font-weight: 600;
            color: #222222;
            margin-bottom: 1rem;
          }

          .custom-airbnb-calendar .react-datepicker__day-names {
            margin-bottom: 0.5rem;
          }

          .custom-airbnb-calendar .react-datepicker__day-name {
            width: 40px;
            color: #757575;
          }

          .custom-airbnb-calendar .react-datepicker__navigation {
            display: none;
          }

          .custom-airbnb-calendar .react-datepicker__month {
            margin: 2.5rem 0;
          }
          .react-datepicker__day--outside-month {
            visibility: hidden;
            pointer-events: none;
          }

          .react-datepicker__day.booked-date {
            cursor: not-allowed;
            opacity: 0.5;
            background-color: #f0f0f0;
            text-decoration: line-through;
          }

          .react-datepicker__day.booked-date:hover {
            background-color: #f0f0f0 !important;
            color: #999 !important;
            cursor: not-allowed;
          }

          .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range {  
            background-color: #222222;
            color: white !important;
          }
        `}</style>
      </Card>
      
 
    </>
  );
};

export default RentalCardValidationData;
