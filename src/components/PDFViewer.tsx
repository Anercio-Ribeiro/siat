"use client";

import { useState, useEffect } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface PDFViewerProps {
  base64Data: string;
}

export const PDFViewer = ({ base64Data }: PDFViewerProps) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (!base64Data || typeof base64Data !== "string") {
        throw new Error("Invalid Base64 data");
      }

      // Validate Base64 format
      if (!/^[A-Za-z0-9+/=]+$/.test(base64Data)) {
        throw new Error("Base64 string contains invalid characters");
      }

      // Check if Base64 string starts with PDF signature
      const binary = atob(base64Data);
      if (!binary.startsWith("%PDF-")) {
        throw new Error("Base64 data does not represent a valid PDF");
      }

      // Convert Base64 to Blob for better performance
      const len = binary.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);

      // Cleanup
      return () => URL.revokeObjectURL(url);
    } catch (err:any) {
      setError(err.message || "Failed to process PDF data");
      console.error("PDFViewer error:", err);
    }
  }, [base64Data]);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="pdf-viewer">
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          width="100%"
          height="500px"
          title="PDF Document"
          style={{ border: "none" }}
        />
      ) : (
        <div>Loading PDF...</div>
      )}
    </div>
  );
};