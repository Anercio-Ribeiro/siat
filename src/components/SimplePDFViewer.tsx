"use client";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface SimplePDFViewerProps {
  base64Data: string;
}

export const SimplePDFViewer = ({ base64Data }: SimplePDFViewerProps) => {
  if (!base64Data || typeof base64Data !== "string") {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Invalid PDF data</AlertDescription>
      </Alert>
    );
  }

  // Validate Base64 format
  if (!/^[A-Za-z0-9+/=]+$/.test(base64Data)) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Base64 string contains invalid characters</AlertDescription>
      </Alert>
    );
  }

  const pdfUrl = `data:application/pdf;base64,${base64Data}`;

  return (
    <iframe
      src={pdfUrl}
      width="100%"
      height="500px"
      title="PDF Document"
      style={{ border: "none" }}
    />
  );
};