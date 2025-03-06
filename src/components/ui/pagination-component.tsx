// // components/ui/pagination.tsx
// import { Button } from "@/components/ui/button";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
//   className?: string;
// }

// export function Pagination({ currentPage, totalPages, onPageChange, className = "" }: PaginationProps) {
//   // Generate page numbers for display
//   const getPageNumbers = () => {
//     const pageNumbers = [];
    
//     // Always show first page
//     pageNumbers.push(1);
    
//     // Calculate range around current page
//     let startPage = Math.max(2, currentPage - 1);
//     let endPage = Math.min(totalPages - 1, currentPage + 1);
    
//     // Add ellipsis after first page if needed
//     if (startPage > 2) {
//       pageNumbers.push('...');
//     }
    
//     // Add page numbers around current page
//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(i);
//     }
    
//     // Add ellipsis before last page if needed
//     if (endPage < totalPages - 1) {
//       pageNumbers.push('...');
//     }
    
//     // Always show last page if there's more than one page
//     if (totalPages > 1) {
//       pageNumbers.push(totalPages);
//     }
    
//     return pageNumbers;
//   };
  
//   if (totalPages <= 1) {
//     return null;
//   }
  
//   return (
//     <div className={`flex items-center justify-center space-x-2 ${className}`}>
//       <Button
//         variant="outline"
//         size="sm"
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//       >
//         <ChevronLeft className="h-4 w-4" />
//       </Button>
      
//       {getPageNumbers().map((page, index) => (
//         typeof page === 'number' ? (
//           <Button
//             key={index}
//             variant={page === currentPage ? "default" : "outline"}
//             size="sm"
//             onClick={() => onPageChange(page)}
//             className="min-w-8 px-3"
//           >
//             {page}
//           </Button>
//         ) : (
//           <span key={index} className="px-1">...</span>
//         )
//       ))}
      
//       <Button
//         variant="outline"
//         size="sm"
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage >= totalPages}
//       >
//         <ChevronRight className="h-4 w-4" />
//       </Button>
//     </div>
//   );
// }


// components/ui/pagination.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Explicitly define the props interface
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  className = "" 
}) => {
  // Generate page numbers for display
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Always show first page
    pageNumbers.push(1);
    
    // Calculate range around current page
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pageNumbers.push('...');
    }
    
    // Add page numbers around current page
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push('...');
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };
  
  if (totalPages <= 1) {
    return null;
  }
  
  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {getPageNumbers().map((page, index) => (
        typeof page === 'number' ? (
          <Button
            key={index}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(page)}
            className="min-w-8 px-3"
          >
            {page}
          </Button>
        ) : (
          <span key={index} className="px-1">...</span>
        )
      ))}
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};