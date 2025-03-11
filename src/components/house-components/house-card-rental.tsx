// import React, { useState, useEffect } from 'react';
// import { Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
// import { Dialog, DialogContent, DialogTrigger, DialogClose } from '@/components/ui/dialog';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { toast } from "sonner";
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import { ptBR } from 'date-fns/locale/pt-BR';
// import { 
//   addMonths, 
//   subMonths,
//   addYears,
//   isSameMonth, 
//   startOfMonth, 
//   endOfMonth, 
//   isSameDay,
//   isWithinInterval,
//   differenceInDays,
//   format,
//   parse,
//   isAfter,
//   isBefore
// } from 'date-fns';
// import { useUser } from "@/hooks/getUser";

// enum TipoAluguel {
//   TURISTICO = 'turistico',
//   RESIDENCIAL = 'residencial',
//   AMBOS = 'ambos'
// }

// interface RentalCardProps {
//   imovel: {
//     id: string;
//     titulo: string;
//     preco: number;
//     precoMensal?: number;
//     tipoAluguel: TipoAluguel;
//     proprietarioId: string;
//   };
// }

// const RentalCard: React.FC<RentalCardProps> = ({ imovel }) => {
//   const { user, loading: userLoading } = useUser();
//   const [tipoReserva, setTipoReserva] = useState<'turistico' | 'residencial'>('turistico');
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);
//   const [isCalendarOpen, setIsCalendarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState<'checkin' | 'checkout'>('checkin');
//   const [bookedDates, setBookedDates] = useState<{ start: Date; end: Date; tipo: TipoAluguel }[]>([]);
//   const [leftMonth, setLeftMonth] = useState(new Date());
//   const [rightMonth, setRightMonth] = useState(addMonths(new Date(), 1));
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedMonth, setSelectedMonth] = useState<string>('');

//   const TODAY = new Date();

//   console.log('user:', user?.id);
//   console.log('user:', imovel?.proprietarioId);

//   // Generate months for residential select
//   const generateMonthOptions = () => {
//     const options = [];
//     const currentDate = new Date();
    
//     for (let i = 0; i < 24; i++) {
//       const date = addMonths(currentDate, i);
//       const value = format(date, 'yyyy-MM');
//       const label = format(date, 'MMMM yyyy', { locale: ptBR });
//       options.push({ value, label });
//     }
    
//     return options;
//   };

//   const monthOptions = generateMonthOptions();

//   useEffect(() => {
//     const fetchBookedDates = async () => {
//       try {
//         const response = await fetch(`/api/aluguel?imovelId=${imovel.id}`);
//         if (!response.ok) throw new Error('Erro ao buscar datas de aluguel');
        
//         const data = await response.json();
//         const dates = data.map((aluguel: any) => ({
//           start: new Date(aluguel.checkIn),
//           end: new Date(aluguel.checkOut),
//           tipo: aluguel.tipoAluguel
//         }));
//         setBookedDates(dates);
//       } catch (error) {
//         console.error('Erro ao buscar datas de aluguel:', error);
//         toast.error("Não foi possível carregar as datas de aluguel.");
//       }
//     };

//     fetchBookedDates();
//   }, [imovel.id]);

//   const validateDateSelection = (newStartDate: Date | null, newEndDate: Date | null) => {
//     if (!newStartDate || !newEndDate) return true;

//     // Validate if start date is not after end date
//     if (isAfter(newStartDate, newEndDate)) {
//       toast.error("A data de check-in não pode ser posterior à data de check-out");
//       return false;
//     }

//     // Validate minimum stay for residential
//     if (tipoReserva === 'residencial') {
//       const days = differenceInDays(newEndDate, newStartDate) + 1;
//       if (days < 90) {
//         toast.warning("Aluguel residencial requer no mínimo 3 meses (90 dias)");
//         return false;
//       }
//     }

//     // Check for booking conflicts throughout the entire period
//     for (let d = new Date(newStartDate); d <= newEndDate; d.setDate(d.getDate() + 1)) {
//       if (isDateBooked(new Date(d))) {
//         toast.error("Existem datas indisponíveis no período selecionado");
//         return false;
//       }
//     }

//     return true;
//   };

//   const handleDateRangeChange = (date: Date | null) => {
//     if (!date) return;
  
//     if (tipoReserva === 'turistico') {
//       if (activeTab === 'checkin') {
//         if (!isDateBooked(date)) {
//           const isValid = validateDateSelection(date, endDate);
//           if (isValid) {
//             setStartDate(date);
//             setActiveTab('checkout');
//           }
//         }
//       } else {
//         if (startDate && !isDateBooked(date)) {
//           const isValid = validateDateSelection(startDate, date);
//           if (isValid) {
//             setEndDate(date);
//             setIsCalendarOpen(false);
//           }
//         }
//       }
//     } else {
//       // Residential booking logic
//       if (!startDate) {
//         if (!isDateBooked(date)) {
//           setStartDate(date);
//         } else {
//           toast.error("Data inicial indisponível");
//         }
//       } else {
//         // Calculate end date for minimum 3-month period
//         const minimumEndDate = addMonths(startDate, 3);
        
//         // Ensure selected end date is not before minimum period
//         if (isBefore(date, minimumEndDate)) {
//           toast.warning("Aluguel residencial requer no mínimo 3 meses (90 dias)");
//           return;
//         }

//         // Check for conflicts in the entire selected period
//         const isValid = validateDateSelection(startDate, date);
//         if (isValid) {
//           setEndDate(date);
//           setIsCalendarOpen(false);
//         }
//       }
//     }
//   };

//   const isDateBooked = (date: Date) => {
//     return bookedDates.some(booking => 
//       isWithinInterval(date, { start: booking.start, end: booking.end })
//     );
//   };

//   const handleMonthChange = (increment: boolean) => {
//     if (increment) {
//       setLeftMonth(addMonths(leftMonth, 1));
//       setRightMonth(addMonths(rightMonth, 1));
//     } else {
//       setLeftMonth(subMonths(leftMonth, 1));
//       setRightMonth(subMonths(rightMonth, 1));
//     }
//   };

//   const handleResidentialMonthSelect = (value: string) => {
//     const selectedDate = parse(value, 'yyyy-MM', new Date());
//     setLeftMonth(selectedDate);
//     setRightMonth(addMonths(selectedDate, 1));
//     setSelectedMonth(value);
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
//       {tipoReserva === 'residencial' ? (
//         <Select value={format(date, 'yyyy-MM')} onValueChange={handleResidentialMonthSelect}>
//           <SelectTrigger className="w-full">
//             <SelectValue>
//               {format(date, 'MMMM yyyy', { locale: ptBR })}
//             </SelectValue>
//           </SelectTrigger>
//           <SelectContent>
//             {monthOptions.map((option) => (
//               <SelectItem key={option.value} value={option.value}>
//                 {option.label}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       ) : (
//         <span className="text-base font-semibold">
//           {format(date, 'MMMM yyyy', { locale: ptBR })}
//         </span>
//       )}
//     </div>
//   );

//   const handleClearDates = () => {
//     setStartDate(null);
//     setEndDate(null);
//     setActiveTab('checkin');
//   };

//   const calcularDuracaoReserva = () => {
//     if (!startDate || !endDate) return 0;
//     return differenceInDays(endDate, startDate) + 1;
//   };

//   const calcularPrecoTotal = () => {
//     if (!startDate || !endDate) return 0;
//     const dias = calcularDuracaoReserva();
    
//     if (tipoReserva === 'turistico') {
//       return dias * (imovel.preco || 0);
//     } else {
//       const meses = Math.ceil(dias / 30);
//       return meses * (imovel.precoMensal || 0);
//     }
//   };

//   const handleReserva = async () => {
//     if (!startDate || !endDate) {
//       toast.warning("Selecione as datas de reserva");
//       return;
//     }

//     if (!validateDateSelection(startDate, endDate)) {
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await fetch('/api/aluguel', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           imovelId: imovel.id,
//           inquilinoId: user?.id,
//           checkIn: startDate,
//           checkOut: endDate,
//           periodoAluguel: calcularDuracaoReserva(),
//           tipoAluguel: tipoReserva,
//           status: 'pendente',
//           preco: calcularPrecoTotal()
//         }),
//       });

//       if (!response.ok) throw new Error('Erro ao criar aluguel');

//       toast.success(`Reserva criada com sucesso para ${calcularDuracaoReserva()} ${tipoReserva === 'turistico' ? 'noites' : 'dias'}.`);
      
//       setBookedDates([...bookedDates, {
//         start: startDate,
//         end: endDate,
//         tipo: tipoReserva === 'turistico' ? TipoAluguel.TURISTICO : TipoAluguel.RESIDENCIAL
//       }]);
      
//       handleClearDates();
//     } catch (error) {
//       console.error('Erro ao criar aluguel:', error);
//       toast.error("Não foi possível criar a reserva. Tente novamente.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const isDateInRange = (date: Date, ranges: { start: Date; end: Date }[]) => {
//     return ranges.some(range => 
//       isWithinInterval(date, { start: range.start, end: range.end })
//     );
//   };

//   const CalendarContent = () => (
//     <div className="flex gap-4">
//       <div className="w-1/2">
//         <DatePicker
//           selected={startDate}
//           onChange={handleDateRangeChange}
//           inline
//           locale={ptBR}
//           minDate={TODAY}
//           maxDate={addYears(TODAY, 1)}
//           renderCustomHeader={CustomHeader}
//           calendarClassName="custom-airbnb-calendar"
//           openToDate={leftMonth}
//           startDate={startDate}
//           endDate={endDate}
//           selectsStart
//           excludeDates={bookedDates.flatMap(booking => {
//             const dates = [];
//             const currentDate = new Date(booking.start);
//             while (currentDate <= booking.end) {
//               dates.push(new Date(currentDate));
//               currentDate.setDate(currentDate.getDate() + 1);
//             }
//             return dates;
//           })}
//           dayClassName={(date) => {
//             if (date.getMonth() !== leftMonth.getMonth()) {
//               return 'react-datepicker__day react-datepicker__day--outside-month';
//             }

//             let className = 'react-datepicker__day';
            
//             if (isDateBooked(date)) {
//               className += ' booked-date';
//             }

//             if (isDateInRange(date, bookedDates)) {
//               className += ' booked-date opacity-50 cursor-not-allowed';
//             }
            
//             if ((startDate && isSameDay(date, startDate)) || 
//                 (endDate && isSameDay(date, endDate))) {
//               className += ' react-datepicker__day--selected';
//             }
            
//             if (startDate && endDate && 
//                 isWithinInterval(date, { start: startDate, end: endDate })) {
//               className += ' react-datepicker__day--in-range';
//             }
            
//             return className;
//           }}
//         />
//       </div>
//       <div className="w-1/2">
//         <DatePicker
//           selected={endDate}
//           onChange={handleDateRangeChange}
//           inline
//           locale={ptBR}
//           minDate={startDate || TODAY}
//           maxDate={addYears(TODAY, 1)}
//           renderCustomHeader={CustomHeader}
//           calendarClassName="custom-airbnb-calendar"
//           openToDate={rightMonth}
//           startDate={startDate}
//           endDate={endDate}
//           selectsEnd
//           excludeDates={bookedDates.flatMap(booking => {
//             const dates = [];
//             const currentDate = new Date(booking.start);
//             while (currentDate <= booking.end) {
//               dates.push(new Date(currentDate));
//               currentDate.setDate(currentDate.getDate() + 1);
//             }
//             return dates;
//           })}
//           dayClassName={(date) => {
//             if (date.getMonth() !== rightMonth.getMonth()) {
//               return 'react-datepicker__day react-datepicker__day--outside-month';
//             }

//             let className = 'react-datepicker__day';
            
//             if (isDateBooked(date)) {
//               className += ' booked-date';
//             }

//             if (isDateInRange(date, bookedDates)) {
//               className += ' booked-date opacity-50 cursor-not-allowed';
//             }
            
//             if ((startDate && isSameDay(date, startDate)) || 
//                 (endDate && isSameDay(date, endDate))) {
//               className += ' react-datepicker__day--selected';
//             }
            
//             if (startDate && endDate && 
//                 isWithinInterval(date, { start: startDate, end: endDate })) {
//               className += ' react-datepicker__day--in-range';
//             }
            
//             return className;
//           }}
//         />
//       </div>
//     </div>
//   );

//   return (
//     <Card className="w-full shadow-lg">
//       <CardHeader className="pb-4 px-6">
//         <div className="text-2xl font-bold">
//           {tipoReserva === 'turistico' 
//             ? `${imovel.preco?.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })} noite`
//             : `${imovel.precoMensal?.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })} mês`
//           }
//         </div>
//       </CardHeader>
//       <CardContent className="space-y-4 px-6">
//         <Tabs 
//           value={tipoReserva} 
//           onValueChange={(value) => {
//             setTipoReserva(value as 'turistico' | 'residencial');
//             handleClearDates();
//           }}
//           className="w-full"
//         >
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="turistico">Turístico</TabsTrigger>
//             <TabsTrigger value="residencial">Residencial</TabsTrigger>
//           </TabsList>
//         </Tabs>

//         <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
//           <DialogTrigger asChild>
//             <div className="grid grid-cols-2 border rounded-lg cursor-pointer">
//               <div className="p-3 text-left hover:bg-gray-50 border-r">
//                 <div className="text-xs font-medium">CHECK-IN</div>
//                 <div>{startDate ? format(startDate, 'dd/MM/yyyy') : 'Adicionar data'}</div>
//               </div>
//               <div className="p-3 text-left hover:bg-gray-50">
//                 <div className="text-xs font-medium">CHECKOUT</div>
//                 <div>{endDate ? format(endDate, 'dd/MM/yyyy') : 'Adicionar data'}</div>
//               </div>
//             </div>
//           </DialogTrigger>

//           <DialogContent className="p-4 max-w-3xl min-h-[600px]">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex-1">
//                 {startDate && endDate ? (
//                   <div>
//                     <div className="text-lg font-semibold">
//                       {calcularDuracaoReserva()} {tipoReserva === 'turistico' ? 'noites' : 'dias'}
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       {format(startDate, 'dd/MM/yyyy')} - {format(endDate, 'dd/MM/yyyy')}
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="text-lg font-semibold">
//                     {tipoReserva === 'turistico' 
//                       ? 'Selecione as datas da sua estadia'
//                       : 'Selecione as datas (mínimo 3 meses)'}
//                   </div>
//                 )}
//               </div>

//               {tipoReserva === 'turistico' && (
//                 <div className="flex items-center gap-2">
//                   <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'checkin' | 'checkout')} className="w-auto">
//                     <TabsList className="p-0 h-auto bg-transparent">
//                       <TabsTrigger
//                         value="checkin"
//                         className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-4 py-2"
//                       >
//                         <div className="text-left">
//                           <div className="text-xs font-medium">CHECK-IN</div>
//                           <div>{startDate ? format(startDate, 'dd/MM/yyyy') : 'Selecionar'}</div>
//                         </div>
//                       </TabsTrigger>
//                       <div className="border-r h-12 mx-2"></div>
//                       <TabsTrigger
//                         value="checkout"
//                         className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-4 py-2"
//                       >
//                         <div className="text-left">
//                           <div className="text-xs font-medium">CHECKOUT</div>
//                           <div>{endDate ? format(endDate, 'dd/MM/yyyy') : 'Selecionar'}</div>
//                         </div>
//                       </TabsTrigger>
//                     </TabsList>
//                   </Tabs>
//                 </div>
//               )}
//             </div>

//             <div className="relative">
//               <Button
//                 onClick={() => handleMonthChange(false)}
//                 variant="ghost"
//                 size="icon"
//                 className="absolute left-4 top-20 z-10 hover:bg-black hover:text-white rounded-full"
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </Button>
//               <Button
//                 onClick={() => handleMonthChange(true)}
//                 variant="ghost"
//                 size="icon"
//                 className="absolute right-4 top-20 z-10 hover:bg-black hover:text-white rounded-full"
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </Button>
              
//               <CalendarContent />
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
//           onClick={handleReserva}
//         >
//           {isLoading 
//             ? 'Processando...' 
//             : `Reservar - ${calcularPrecoTotal().toLocaleString('pt-BR', {
//                 style: 'currency',
//                 currency: 'AOA',
//               })}`
//           }
//         </Button>

//         {startDate && endDate && (
//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <div className="underline">
//                 {tipoReserva === 'turistico'
//                   ? `${imovel.preco?.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })} x ${calcularDuracaoReserva()} noites`
//                   : `${imovel.precoMensal?.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })} x ${Math.ceil(calcularDuracaoReserva() / 30)} meses`
//                 }
//               </div>
//               <div>
//                 {calcularPrecoTotal().toLocaleString('pt-BR', {
//                   style: 'currency',
//                   currency: 'AOA',
//                 })}
//               </div>
//             </div>

//             <Separator />

//             <div className="flex justify-between items-center font-bold">
//               <div>Total</div>
//               <div>
//                 {calcularPrecoTotal().toLocaleString('pt-BR', {
//                   style: 'currency',
//                   currency: 'AOA',
//                 })}
//               </div>
//             </div>
//           </div>
//         )}
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
//           position: relative;
//         }

//         .custom-airbnb-calendar .react-datepicker__day:hover:not(.react-datepicker__day--disabled) {
//           background-color: #222222;
//           color: white;
//           border-radius: 0;
//         }

//         .custom-airbnb-calendar .react-datepicker__day--selected {
//           background-color: #000;
//           color: white;
//           border-radius: 0;
//         }

//         .custom-airbnb-calendar .react-datepicker__day--in-range {
//           background-color: #000;
//           color: #fff;
//           border-radius: 0;
//         }

//         .custom-airbnb-calendar .disabled-date {
//           width: 100%;
//           height: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
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
//           margin-bottom: 2.5rem;
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
//           position: relative;
//         }

//         .react-datepicker__day.booked-date::after {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           color: #ff0000;
//           font-size: 14px;
//         }

//         .react-datepicker__day.booked-date:hover {
//           background-color: #f0f0f0 !important;
//           color: #999 !important;
//           cursor: not-allowed;
//         }
//       `}</style>
//     </Card>
//   );
// };

// export default RentalCard;




// import React, { useState, useEffect } from 'react';
// import { Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
// import { Dialog, DialogContent, DialogTrigger, DialogClose } from '@/components/ui/dialog';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { toast } from "sonner";
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import { ptBR } from 'date-fns/locale/pt-BR';
// import { 
//   addMonths, 
//   subMonths,
//   addYears,
//   isSameMonth, 
//   startOfMonth, 
//   endOfMonth, 
//   isSameDay,
//   isWithinInterval,
//   differenceInDays,
//   format,
//   parse,
//   isAfter,
//   isBefore
// } from 'date-fns';
// import { useUser } from "@/hooks/getUser";

// enum TipoAluguel {
//   TURISTICO = 'turistico',
//   RESIDENCIAL = 'residencial',
//   AMBOS = 'ambos'
// }

// interface RentalCardProps {
//   imovel: {
//     id: string;
//     titulo: string;
//     preco: number;
//     precoMensal?: number;
//     tipoAluguel: TipoAluguel;
//   };
// }

// const RentalCard: React.FC<RentalCardProps> = ({ imovel }) => {
//   const { user, loading: userLoading } = useUser();
//   const [tipoReserva, setTipoReserva] = useState<'turistico' | 'residencial'>('turistico');
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);
//   const [isCalendarOpen, setIsCalendarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState<'checkin' | 'checkout'>('checkin');
//   const [bookedDates, setBookedDates] = useState<{ start: Date; end: Date; tipo: TipoAluguel }[]>([]);
//   const [leftMonth, setLeftMonth] = useState(new Date());
//   const [rightMonth, setRightMonth] = useState(addMonths(new Date(), 1));
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedMonth, setSelectedMonth] = useState<string>('');

//   const TODAY = new Date();

//   // Generate months for residential select
//   const generateMonthOptions = () => {
//     const options = [];
//     const currentDate = new Date();
    
//     for (let i = 0; i < 24; i++) {
//       const date = addMonths(currentDate, i);
//       const value = format(date, 'yyyy-MM');
//       const label = format(date, 'MMMM yyyy', { locale: ptBR });
//       options.push({ value, label });
//     }
    
//     return options;
//   };

//   const monthOptions = generateMonthOptions();

//   useEffect(() => {
//     const fetchBookedDates = async () => {
//       try {
//         const response = await fetch(`/api/aluguel?imovelId=${imovel.id}`);
//         if (!response.ok) throw new Error('Erro ao buscar datas de aluguel');
        
//         const data = await response.json();
//         const dates = data.map((aluguel: any) => ({
//           start: new Date(aluguel.checkIn),
//           end: new Date(aluguel.checkOut),
//           tipo: aluguel.tipoAluguel
//         }));
//         setBookedDates(dates);
//       } catch (error) {
//         console.error('Erro ao buscar datas de aluguel:', error);
//         toast.error("Não foi possível carregar as datas de aluguel.");
//       }
//     };

//     fetchBookedDates();
//   }, [imovel.id]);

//   const validateDateSelection = (newStartDate: Date | null, newEndDate: Date | null) => {
//     if (!newStartDate || !newEndDate) return true;

//     // Validate if start date is not after end date
//     if (isAfter(newStartDate, newEndDate)) {
//       toast.error("A data de check-in não pode ser posterior à data de check-out");
//       return false;
//     }

//     // Validate minimum stay for residential
//     if (tipoReserva === 'residencial') {
//       const days = differenceInDays(newEndDate, newStartDate) + 1;
//       if (days < 90) {
//         toast.warning("Aluguel residencial requer no mínimo 3 meses (90 dias)");
//         return false;
//       }
//     }

//     // Check for booking conflicts throughout the entire period
//     for (let d = new Date(newStartDate); d <= newEndDate; d.setDate(d.getDate() + 1)) {
//       if (isDateBooked(new Date(d))) {
//         toast.error("Existem datas indisponíveis no período selecionado");
//         return false;
//       }
//     }

//     return true;
//   };

//   const handleDateRangeChange = (date: Date | null) => {
//     if (!date) return;
  
//     if (tipoReserva === 'turistico') {
//       if (activeTab === 'checkin') {
//         if (!isDateBooked(date)) {
//           const isValid = validateDateSelection(date, endDate);
//           if (isValid) {
//             setStartDate(date);
//             setActiveTab('checkout');
//           }
//         }
//       } else {
//         if (startDate && !isDateBooked(date)) {
//           const isValid = validateDateSelection(startDate, date);
//           if (isValid) {
//             setEndDate(date);
//             setIsCalendarOpen(false);
//           }
//         }
//       }
//     } else {
//       // Residential booking logic
//       if (!startDate) {
//         if (!isDateBooked(date)) {
//           setStartDate(date);
//         } else {
//           toast.error("Data inicial indisponível");
//         }
//       } else {
//         // Calculate end date for minimum 3-month period
//         const minimumEndDate = addMonths(startDate, 3);
        
//         // Ensure selected end date is not before minimum period
//         if (isBefore(date, minimumEndDate)) {
//           toast.warning("Aluguel residencial requer no mínimo 3 meses (90 dias)");
//           return;
//         }

//         // Check for conflicts in the entire selected period
//         const isValid = validateDateSelection(startDate, date);
//         if (isValid) {
//           setEndDate(date);
//           setIsCalendarOpen(false);
//         }
//       }
//     }
//   };

//   const isDateBooked = (date: Date) => {
//     return bookedDates.some(booking => 
//       isWithinInterval(date, { start: booking.start, end: booking.end })
//     );
//   };

//   const handleMonthChange = (increment: boolean) => {
//     if (increment) {
//       setLeftMonth(addMonths(leftMonth, 1));
//       setRightMonth(addMonths(rightMonth, 1));
//     } else {
//       setLeftMonth(subMonths(leftMonth, 1));
//       setRightMonth(subMonths(rightMonth, 1));
//     }
//   };

//   const handleResidentialMonthSelect = (value: string) => {
//     const selectedDate = parse(value, 'yyyy-MM', new Date());
//     setLeftMonth(selectedDate);
//     setRightMonth(addMonths(selectedDate, 1));
//     setSelectedMonth(value);
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
//       {tipoReserva === 'residencial' ? (
//         <Select value={format(date, 'yyyy-MM')} onValueChange={handleResidentialMonthSelect}>
//           <SelectTrigger className="w-full">
//             <SelectValue>
//               {format(date, 'MMMM yyyy', { locale: ptBR })}
//             </SelectValue>
//           </SelectTrigger>
//           <SelectContent>
//             {monthOptions.map((option) => (
//               <SelectItem key={option.value} value={option.value}>
//                 {option.label}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       ) : (
//         <span className="text-base font-semibold">
//           {format(date, 'MMMM yyyy', { locale: ptBR })}
//         </span>
//       )}
//     </div>
//   );

//   const handleClearDates = () => {
//     setStartDate(null);
//     setEndDate(null);
//     setActiveTab('checkin');
//   };

//   const calcularDuracaoReserva = () => {
//     if (!startDate || !endDate) return 0;
//     return differenceInDays(endDate, startDate) + 1;
//   };

//   const calcularPrecoTotal = () => {
//     if (!startDate || !endDate) return 0;
//     const dias = calcularDuracaoReserva();
    
//     if (tipoReserva === 'turistico') {
//       return dias * (imovel.preco || 0);
//     } else {
//       const meses = Math.ceil(dias / 30);
//       return meses * (imovel.precoMensal || 0);
//     }
//   };

//   const handleReserva = async () => {
//     if (!startDate || !endDate) {
//       toast.warning("Selecione as datas de reserva");
//       return;
//     }

//     if (!validateDateSelection(startDate, endDate)) {
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await fetch('/api/aluguel', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           imovelId: imovel.id,
//           inquilinoId: user?.id,
//           checkIn: startDate,
//           checkOut: endDate,
//           periodoAluguel: calcularDuracaoReserva(),
//           tipoAluguel: tipoReserva,
//           status: 'pendente',
//           preco: calcularPrecoTotal()
//         }),
//       });

//       if (!response.ok) throw new Error('Erro ao criar aluguel');

//       toast.success(`Reserva criada com sucesso para ${calcularDuracaoReserva()} ${tipoReserva === 'turistico' ? 'noites' : 'dias'}.`);
      
//       setBookedDates([...bookedDates, {
//         start: startDate,
//         end: endDate,
//         tipo: tipoReserva === 'turistico' ? TipoAluguel.TURISTICO : TipoAluguel.RESIDENCIAL
//       }]);
      
//       handleClearDates();
//     } catch (error) {
//       console.error('Erro ao criar aluguel:', error);
//       toast.error("Não foi possível criar a reserva. Tente novamente.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const isDateInRange = (date: Date, ranges: { start: Date; end: Date }[]) => {
//     return ranges.some(range => 
//       isWithinInterval(date, { start: range.start, end: range.end })
//     );
//   };

//   const CalendarContent = () => (
//     <div className="flex gap-4">
//       <div className="w-1/2">
//         <DatePicker
//           selected={startDate}
//           onChange={handleDateRangeChange}
//           inline
//           locale={ptBR}
//           minDate={TODAY}
//           maxDate={addYears(TODAY, 1)}
//           renderCustomHeader={CustomHeader}
//           calendarClassName="custom-airbnb-calendar"
//           openToDate={leftMonth}
//           startDate={startDate}
//           endDate={endDate}
//           selectsStart
//           excludeDates={bookedDates.flatMap(booking => {
//             const dates = [];
//             const currentDate = new Date(booking.start);
//             while (currentDate <= booking.end) {
//               dates.push(new Date(currentDate));
//               currentDate.setDate(currentDate.getDate() + 1);
//             }
//             return dates;
//           })}
//           dayClassName={(date) => {
//             if (date.getMonth() !== leftMonth.getMonth()) {
//               return 'react-datepicker__day react-datepicker__day--outside-month';
//             }

//             let className = 'react-datepicker__day';
            
//             if (isDateBooked(date)) {
//               className += ' booked-date';
//             }

//             if (isDateInRange(date, bookedDates)) {
//               className += ' booked-date opacity-50 cursor-not-allowed';
//             }
            
//             if ((startDate && isSameDay(date, startDate)) || 
//                 (endDate && isSameDay(date, endDate))) {
//               className += ' react-datepicker__day--selected';
//             }
            
//             if (startDate && endDate && 
//                 isWithinInterval(date, { start: startDate, end: endDate })) {
//               className += ' react-datepicker__day--in-range';
//             }
            
//             return className;
//           }}
//         />
//       </div>
//       <div className="w-1/2">
//         <DatePicker
//           selected={endDate}
//           onChange={handleDateRangeChange}
//           inline
//           locale={ptBR}
//           minDate={startDate || TODAY}
//           maxDate={addYears(TODAY, 1)}
//           renderCustomHeader={CustomHeader}
//           calendarClassName="custom-airbnb-calendar"
//           openToDate={rightMonth}
//           startDate={startDate}
//           endDate={endDate}
//           selectsEnd
//           excludeDates={bookedDates.flatMap(booking => {
//             const dates = [];
//             const currentDate = new Date(booking.start);
//             while (currentDate <= booking.end) {
//               dates.push(new Date(currentDate));
//               currentDate.setDate(currentDate.getDate() + 1);
//             }
//             return dates;
//           })}
//           dayClassName={(date) => {
//             if (date.getMonth() !== rightMonth.getMonth()) {
//               return 'react-datepicker__day react-datepicker__day--outside-month';
//             }

//             let className = 'react-datepicker__day';
            
//             if (isDateBooked(date)) {
//               className += ' booked-date';
//             }

//             if (isDateInRange(date, bookedDates)) {
//               className += ' booked-date opacity-50 cursor-not-allowed';
//             }
            
//             if ((startDate && isSameDay(date, startDate)) || 
//                 (endDate && isSameDay(date, endDate))) {
//               className += ' react-datepicker__day--selected';
//             }
            
//             if (startDate && endDate && 
//                 isWithinInterval(date, { start: startDate, end: endDate })) {
//               className += ' react-datepicker__day--in-range';
//             }
            
//             return className;
//           }}
//         />
//       </div>
//     </div>
//   );

//   return (
//     <Card className="w-full shadow-lg">
//       <CardHeader className="pb-4 px-6">
//         <div className="text-2xl font-bold">
//           {tipoReserva === 'turistico' 
//             ? `${imovel.preco?.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })} noite`
//             : `${imovel.precoMensal?.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })} mês`
//           }
//         </div>
//       </CardHeader>
//       <CardContent className="space-y-4 px-6">
//         <Tabs 
//           value={tipoReserva} 
//           onValueChange={(value) => {
//             setTipoReserva(value as 'turistico' | 'residencial');
//             handleClearDates();
//           }}
//           className="w-full"
//         >
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="turistico">Turístico</TabsTrigger>
//             <TabsTrigger value="residencial">Residencial</TabsTrigger>
//           </TabsList>
//         </Tabs>

//         <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
//           <DialogTrigger asChild>
//             <div className="grid grid-cols-2 border rounded-lg cursor-pointer">
//               <div className="p-3 text-left hover:bg-gray-50 border-r">
//                 <div className="text-xs font-medium">CHECK-IN</div>
//                 <div>{startDate ? format(startDate, 'dd/MM/yyyy') : 'Adicionar data'}</div>
//               </div>
//               <div className="p-3 text-left hover:bg-gray-50">
//                 <div className="text-xs font-medium">CHECKOUT</div>
//                 <div>{endDate ? format(endDate, 'dd/MM/yyyy') : 'Adicionar data'}</div>
//               </div>
//             </div>
//           </DialogTrigger>

//           <DialogContent className="p-4 max-w-3xl min-h-[600px]">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex-1">
//                 {startDate && endDate ? (
//                   <div>
//                     <div className="text-lg font-semibold">
//                       {calcularDuracaoReserva()} {tipoReserva === 'turistico' ? 'noites' : 'dias'}
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       {format(startDate, 'dd/MM/yyyy')} - {format(endDate, 'dd/MM/yyyy')}
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="text-lg font-semibold">
//                     {tipoReserva === 'turistico' 
//                       ? 'Selecione as datas da sua estadia'
//                       : 'Selecione as datas (mínimo 3 meses)'}
//                   </div>
//                 )}
//               </div>

//               {tipoReserva === 'turistico' && (
//                 <div className="flex items-center gap-2">
//                   <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'checkin' | 'checkout')} className="w-auto">
//                     <TabsList className="p-0 h-auto bg-transparent">
//                       <TabsTrigger
//                         value="checkin"
//                         className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-4 py-2"
//                       >
//                         <div className="text-left">
//                           <div className="text-xs font-medium">CHECK-IN</div>
//                           <div>{startDate ? format(startDate, 'dd/MM/yyyy') : 'Selecionar'}</div>
//                         </div>
//                       </TabsTrigger>
//                       <div className="border-r h-12 mx-2"></div>
//                       <TabsTrigger
//                         value="checkout"
//                         className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-4 py-2"
//                       >
//                         <div className="text-left">
//                           <div className="text-xs font-medium">CHECKOUT</div>
//                           <div>{endDate ? format(endDate, 'dd/MM/yyyy') : 'Selecionar'}</div>
//                         </div>
//                       </TabsTrigger>
//                     </TabsList>
//                   </Tabs>
//                 </div>
//               )}
//             </div>

//             <div className="relative">
//               <Button
//                 onClick={() => handleMonthChange(false)}
//                 variant="ghost"
//                 size="icon"
//                 className="absolute left-4 top-20 z-10 hover:bg-black hover:text-white rounded-full"
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </Button>
//               <Button
//                 onClick={() => handleMonthChange(true)}
//                 variant="ghost"
//                 size="icon"
//                 className="absolute right-4 top-20 z-10 hover:bg-black hover:text-white rounded-full"
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </Button>
              
//               <CalendarContent />
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
//           onClick={handleReserva}
//         >
//           {isLoading 
//             ? 'Processando...' 
//             : `Reservar - ${calcularPrecoTotal().toLocaleString('pt-BR', {
//                 style: 'currency',
//                 currency: 'AOA',
//               })}`
//           }
//         </Button>

//         {startDate && endDate && (
//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <div className="underline">
//                 {tipoReserva === 'turistico'
//                   ? `${imovel.preco?.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })} x ${calcularDuracaoReserva()} noites`
//                   : `${imovel.precoMensal?.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })} x ${Math.ceil(calcularDuracaoReserva() / 30)} meses`
//                 }
//               </div>
//               <div>
//                 {calcularPrecoTotal().toLocaleString('pt-BR', {
//                   style: 'currency',
//                   currency: 'AOA',
//                 })}
//               </div>
//             </div>

//             <Separator />

//             <div className="flex justify-between items-center font-bold">
//               <div>Total</div>
//               <div>
//                 {calcularPrecoTotal().toLocaleString('pt-BR', {
//                   style: 'currency',
//                   currency: 'AOA',
//                 })}
//               </div>
//             </div>
//           </div>
//         )}
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
//           position: relative;
//         }

//         .custom-airbnb-calendar .react-datepicker__day:hover:not(.react-datepicker__day--disabled) {
//           background-color: #222222;
//           color: white;
//           border-radius: 0;
//         }

//         .custom-airbnb-calendar .react-datepicker__day--selected {
//           background-color: #000;
//           color: white;
//           border-radius: 0;
//         }

//         .custom-airbnb-calendar .react-datepicker__day--in-range {
//           background-color: #000;
//           color: #fff;
//           border-radius: 0;
//         }

//         .custom-airbnb-calendar .disabled-date {
//           width: 100%;
//           height: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
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
//           margin-bottom: 2.5rem;
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
//           position: relative;
//         }

//         .react-datepicker__day.booked-date::after {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           color: #ff0000;
//           font-size: 14px;
//         }

//         .react-datepicker__day.booked-date:hover {
//           background-color: #f0f0f0 !important;
//           color: #999 !important;
//           cursor: not-allowed;
//         }
//       `}</style>
//     </Card>
//   );
// };

// export default RentalCard;



// import React, { useState, useEffect } from 'react';
// import { Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
// import { Dialog, DialogContent, DialogTrigger, DialogClose } from '@/components/ui/dialog';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { toast } from "sonner";
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import { ptBR } from 'date-fns/locale/pt-BR';
// import { 
//   addMonths, 
//   subMonths,
//   addYears,
//   isSameMonth, 
//   startOfMonth, 
//   endOfMonth, 
//   isSameDay,
//   isWithinInterval,
//   differenceInDays,
//   format,
//   parse,
//   isAfter,
//   isBefore
// } from 'date-fns';
// import { useUser } from "@/hooks/getUser";

// enum TipoAluguel {
//   TURISTICO = 'turistico',
//   RESIDENCIAL = 'residencial',
//   AMBOS = 'ambos'
// }

// interface RentalCardProps {
//   imovel: {
//     id: string;
//     titulo: string;
//     preco: number;
//     precoMensal?: number;
//     tipoAluguel: TipoAluguel;
//     proprietarioId: string; // Adicionando o ID do proprietário
//   };
// }

// const RentalCard: React.FC<RentalCardProps> = ({ imovel }) => {
//   const { user, loading: userLoading } = useUser();
//   const [tipoReserva, setTipoReserva] = useState<'turistico' | 'residencial'>('turistico');
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);
//   const [isCalendarOpen, setIsCalendarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState<'checkin' | 'checkout'>('checkin');
//   const [bookedDates, setBookedDates] = useState<{ start: Date; end: Date; tipo: TipoAluguel }[]>([]);
//   const [leftMonth, setLeftMonth] = useState(new Date());
//   const [rightMonth, setRightMonth] = useState(addMonths(new Date(), 1));
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedMonth, setSelectedMonth] = useState<string>('');

//   const TODAY = new Date();

//   // Generate months for residential select
//   const generateMonthOptions = () => {
//     const options = [];
//     const currentDate = new Date();
    
//     for (let i = 0; i < 24; i++) {
//       const date = addMonths(currentDate, i);
//       const value = format(date, 'yyyy-MM');
//       const label = format(date, 'MMMM yyyy', { locale: ptBR });
//       options.push({ value, label });
//     }
    
//     return options;
//   };

//   const monthOptions = generateMonthOptions();

//   useEffect(() => {
//     const fetchBookedDates = async () => {
//       try {
//         const response = await fetch(`/api/aluguel?imovelId=${imovel.id}`);
//         if (!response.ok) throw new Error('Erro ao buscar datas de aluguel');
        
//         const data = await response.json();
//         const dates = data.map((aluguel: any) => ({
//           start: new Date(aluguel.checkIn),
//           end: new Date(aluguel.checkOut),
//           tipo: aluguel.tipoAluguel
//         }));
//         setBookedDates(dates);
//       } catch (error) {
//         console.error('Erro ao buscar datas de aluguel:', error);
//         toast.error("Não foi possível carregar as datas de aluguel.");
//       }
//     };

//     fetchBookedDates();
//   }, [imovel.id]);

//   const validateDateSelection = (newStartDate: Date | null, newEndDate: Date | null) => {
//     if (!newStartDate || !newEndDate) return true;

//     // Validate if start date is not after end date
//     if (isAfter(newStartDate, newEndDate)) {
//       toast.error("A data de check-in não pode ser posterior à data de check-out");
//       return false;
//     }

//     // Validate minimum stay for residential
//     if (tipoReserva === 'residencial') {
//       const days = differenceInDays(newEndDate, newStartDate) + 1;
//       if (days < 90) {
//         toast.warning("Aluguel residencial requer no mínimo 3 meses (90 dias)");
//         return false;
//       }
//     }

//     // Check for booking conflicts throughout the entire period
//     for (let d = new Date(newStartDate); d <= newEndDate; d.setDate(d.getDate() + 1)) {
//       if (isDateBooked(new Date(d))) {
//         toast.error("Existem datas indisponíveis no período selecionado");
//         return false;
//       }
//     }

//     return true;
//   };

//   const handleDateRangeChange = (date: Date | null) => {
//     if (!date) return;
  
//     if (tipoReserva === 'turistico') {
//       if (activeTab === 'checkin') {
//         if (!isDateBooked(date)) {
//           const isValid = validateDateSelection(date, endDate);
//           if (isValid) {
//             setStartDate(date);
//             setActiveTab('checkout');
//           }
//         }
//       } else {
//         if (startDate && !isDateBooked(date)) {
//           const isValid = validateDateSelection(startDate, date);
//           if (isValid) {
//             setEndDate(date);
//             setIsCalendarOpen(false);
//           }
//         }
//       }
//     } else {
//       // Residential booking logic
//       if (!startDate) {
//         if (!isDateBooked(date)) {
//           setStartDate(date);
//         } else {
//           toast.error("Data inicial indisponível");
//         }
//       } else {
//         // Calculate end date for minimum 3-month period
//         const minimumEndDate = addMonths(startDate, 3);
        
//         // Ensure selected end date is not before minimum period
//         if (isBefore(date, minimumEndDate)) {
//           toast.warning("Aluguel residencial requer no mínimo 3 meses (90 dias)");
//           return;
//         }

//         // Check for conflicts in the entire selected period
//         const isValid = validateDateSelection(startDate, date);
//         if (isValid) {
//           setEndDate(date);
//           setIsCalendarOpen(false);
//         }
//       }
//     }
//   };

//   const isDateBooked = (date: Date) => {
//     return bookedDates.some(booking => 
//       isWithinInterval(date, { start: booking.start, end: booking.end })
//     );
//   };

//   const handleMonthChange = (increment: boolean) => {
//     if (increment) {
//       setLeftMonth(addMonths(leftMonth, 1));
//       setRightMonth(addMonths(rightMonth, 1));
//     } else {
//       setLeftMonth(subMonths(leftMonth, 1));
//       setRightMonth(subMonths(rightMonth, 1));
//     }
//   };

//   const handleResidentialMonthSelect = (value: string) => {
//     const selectedDate = parse(value, 'yyyy-MM', new Date());
//     setLeftMonth(selectedDate);
//     setRightMonth(addMonths(selectedDate, 1));
//     setSelectedMonth(value);
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
//       {tipoReserva === 'residencial' ? (
//         <Select value={format(date, 'yyyy-MM')} onValueChange={handleResidentialMonthSelect}>
//           <SelectTrigger className="w-full">
//             <SelectValue>
//               {format(date, 'MMMM yyyy', { locale: ptBR })}
//             </SelectValue>
//           </SelectTrigger>
//           <SelectContent>
//             {monthOptions.map((option) => (
//               <SelectItem key={option.value} value={option.value}>
//                 {option.label}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       ) : (
//         <span className="text-base font-semibold">
//           {format(date, 'MMMM yyyy', { locale: ptBR })}
//         </span>
//       )}
//     </div>
//   );

//   const handleClearDates = () => {
//     setStartDate(null);
//     setEndDate(null);
//     setActiveTab('checkin');
//   };

//   const calcularDuracaoReserva = () => {
//     if (!startDate || !endDate) return 0;
//     return differenceInDays(endDate, startDate) + 1;
//   };

//   const calcularPrecoTotal = () => {
//     if (!startDate || !endDate) return 0;
//     const dias = calcularDuracaoReserva();
    
//     if (tipoReserva === 'turistico') {
//       return dias * (imovel.preco || 0);
//     } else {
//       const meses = Math.ceil(dias / 30);
//       return meses * (imovel.precoMensal || 0);
//     }
//   };

//   const handleReserva = async () => {
//     if (!startDate || !endDate) {
//       toast.warning("Selecione as datas de reserva");
//       return;
//     }

//     if (!validateDateSelection(startDate, endDate)) {
//       return;
//     }

//     // Verificar se o usuário é o proprietário do imóvel
//     if (user?.id === imovel.proprietarioId) {
//       toast.error("Você não pode alugar seu próprio imóvel");
//       return;
//     }

//     // Verificar se o usuário está autenticado
//     if (!user) {
//       toast.error("Você precisa estar logado para fazer uma reserva");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await fetch('/api/aluguel', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           imovelId: imovel.id,
//           inquilinoId: user.id,
//           checkIn: startDate,
//           checkOut: endDate,
//           periodoAluguel: calcularDuracaoReserva(),
//           tipoAluguel: tipoReserva,
//           status: 'pendente',
//           preco: calcularPrecoTotal()
//         }),
//       });

//       if (!response.ok) throw new Error('Erro ao criar aluguel');

//       toast.success(`Reserva criada com sucesso para ${calcularDuracaoReserva()} ${tipoReserva === 'turistico' ? 'noites' : 'dias'}.`);
      
//       setBookedDates([...bookedDates, {
//         start: startDate,
//         end: endDate,
//         tipo: tipoReserva === 'turistico' ? TipoAluguel.TURISTICO : TipoAluguel.RESIDENCIAL
//       }]);
      
//       handleClearDates();
//     } catch (error) {
//       console.error('Erro ao criar aluguel:', error);
//       toast.error("Não foi possível criar a reserva. Tente novamente.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const isDateInRange = (date: Date, ranges: { start: Date; end: Date }[]) => {
//     return ranges.some(range => 
//       isWithinInterval(date, { start: range.start, end: range.end })
//     );
//   };

//   const CalendarContent = () => (
//     <div className="flex gap-4">
//       <div className="w-1/2">
//         <DatePicker
//           selected={startDate}
//           onChange={handleDateRangeChange}
//           inline
//           locale={ptBR}
//           minDate={TODAY}
//           maxDate={addYears(TODAY, 1)}
//           renderCustomHeader={CustomHeader}
//           calendarClassName="custom-airbnb-calendar"
//           openToDate={leftMonth}
//           startDate={startDate}
//           endDate={endDate}
//           selectsStart
//           excludeDates={bookedDates.flatMap(booking => {
//             const dates = [];
//             const currentDate = new Date(booking.start);
//             while (currentDate <= booking.end) {
//               dates.push(new Date(currentDate));
//               currentDate.setDate(currentDate.getDate() + 1);
//             }
//             return dates;
//           })}
//           dayClassName={(date) => {
//             if (date.getMonth() !== leftMonth.getMonth()) {
//               return 'react-datepicker__day react-datepicker__day--outside-month';
//             }

//             let className = 'react-datepicker__day';
            
//             if (isDateBooked(date)) {
//               className += ' booked-date';
//             }

//             if (isDateInRange(date, bookedDates)) {
//               className += ' booked-date opacity-50 cursor-not-allowed';
//             }
            
//             if ((startDate && isSameDay(date, startDate)) || 
//                 (endDate && isSameDay(date, endDate))) {
//               className += ' react-datepicker__day--selected';
//             }
            
//             if (startDate && endDate && 
//                 isWithinInterval(date, { start: startDate, end: endDate })) {
//               className += ' react-datepicker__day--in-range';
//             }
            
//             return className;
//           }}
//         />
//       </div>
//       <div className="w-1/2">
//         <DatePicker
//           selected={endDate}
//           onChange={handleDateRangeChange}
//           inline
//           locale={ptBR}
//           minDate={startDate || TODAY}
//           maxDate={addYears(TODAY, 1)}
//           renderCustomHeader={CustomHeader}
//           calendarClassName="custom-airbnb-calendar"
//           openToDate={rightMonth}
//           startDate={startDate}
//           endDate={endDate}
//           selectsEnd
//           excludeDates={bookedDates.flatMap(booking => {
//             const dates = [];
//             const currentDate = new Date(booking.start);
//             while (currentDate <= booking.end) {
//               dates.push(new Date(currentDate));
//               currentDate.setDate(currentDate.getDate() + 1);
//             }
//             return dates;
//           })}
//           dayClassName={(date) => {
//             if (date.getMonth() !== rightMonth.getMonth()) {
//               return 'react-datepicker__day react-datepicker__day--outside-month';
//             }

//             let className = 'react-datepicker__day';
            
//             if (isDateBooked(date)) {
//               className += ' booked-date';
//             }

//             if (isDateInRange(date, bookedDates)) {
//               className += ' booked-date opacity-50 cursor-not-allowed';
//             }
            
//             if ((startDate && isSameDay(date, startDate)) || 
//                 (endDate && isSameDay(date, endDate))) {
//               className += ' react-datepicker__day--selected';
//             }
            
//             if (startDate && endDate && 
//                 isWithinInterval(date, { start: startDate, end: endDate })) {
//               className += ' react-datepicker__day--in-range';
//             }
            
//             return className;
//           }}
//         />
//       </div>
//     </div>
//   );

//   // Verificar se o usuário é o proprietário para desabilitar o botão de reserva
//   const isOwner = user?.id === imovel.proprietarioId;

//   return (
//     <Card className="w-full shadow-lg">
//       <CardHeader className="pb-4 px-6">
//         <div className="text-2xl font-bold">
//           {tipoReserva === 'turistico' 
//             ? `${imovel.preco?.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })} noite`
//             : `${imovel.precoMensal?.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })} mês`
//           }
//         </div>
//         {isOwner && (
//           <div className="text-sm text-red-500 font-medium mt-2">
//             Você é o proprietário deste imóvel e não pode alugá-lo.
//           </div>
//         )}
//       </CardHeader>
//       <CardContent className="space-y-4 px-6">
//         <Tabs 
//           value={tipoReserva} 
//           onValueChange={(value) => {
//             setTipoReserva(value as 'turistico' | 'residencial');
//             handleClearDates();
//           }}
//           className="w-full"
//         >
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="turistico">Turístico</TabsTrigger>
//             <TabsTrigger value="residencial">Residencial</TabsTrigger>
//           </TabsList>
//         </Tabs>

//         <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
//           <DialogTrigger asChild>
//             <div className="grid grid-cols-2 border rounded-lg cursor-pointer">
//               <div className="p-3 text-left hover:bg-gray-50 border-r">
//                 <div className="text-xs font-medium">CHECK-IN</div>
//                 <div>{startDate ? format(startDate, 'dd/MM/yyyy') : 'Adicionar data'}</div>
//               </div>
//               <div className="p-3 text-left hover:bg-gray-50">
//                 <div className="text-xs font-medium">CHECKOUT</div>
//                 <div>{endDate ? format(endDate, 'dd/MM/yyyy') : 'Adicionar data'}</div>
//               </div>
//             </div>
//           </DialogTrigger>

//           <DialogContent className="p-4 max-w-3xl min-h-[600px]">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex-1">
//                 {startDate && endDate ? (
//                   <div>
//                     <div className="text-lg font-semibold">
//                       {calcularDuracaoReserva()} {tipoReserva === 'turistico' ? 'noites' : 'dias'}
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       {format(startDate, 'dd/MM/yyyy')} - {format(endDate, 'dd/MM/yyyy')}
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="text-lg font-semibold">
//                     {tipoReserva === 'turistico' 
//                       ? 'Selecione as datas da sua estadia'
//                       : 'Selecione as datas (mínimo 3 meses)'}
//                   </div>
//                 )}
//               </div>

//               {tipoReserva === 'turistico' && (
//                 <div className="flex items-center gap-2">
//                   <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'checkin' | 'checkout')} className="w-auto">
//                     <TabsList className="p-0 h-auto bg-transparent">
//                       <TabsTrigger
//                         value="checkin"
//                         className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-4 py-2"
//                       >
//                         <div className="text-left">
//                           <div className="text-xs font-medium">CHECK-IN</div>
//                           <div>{startDate ? format(startDate, 'dd/MM/yyyy') : 'Selecionar'}</div>
//                         </div>
//                       </TabsTrigger>
//                       <div className="border-r h-12 mx-2"></div>
//                       <TabsTrigger
//                         value="checkout"
//                         className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-4 py-2"
//                       >
//                         <div className="text-left">
//                           <div className="text-xs font-medium">CHECKOUT</div>
//                           <div>{endDate ? format(endDate, 'dd/MM/yyyy') : 'Selecionar'}</div>
//                         </div>
//                       </TabsTrigger>
//                     </TabsList>
//                   </Tabs>
//                 </div>
//               )}
//             </div>

//             <div className="relative">
//               <Button
//                 onClick={() => handleMonthChange(false)}
//                 variant="ghost"
//                 size="icon"
//                 className="absolute left-4 top-20 z-10 hover:bg-black hover:text-white rounded-full"
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </Button>
//               <Button
//                 onClick={() => handleMonthChange(true)}
//                 variant="ghost"
//                 size="icon"
//                 className="absolute right-4 top-20 z-10 hover:bg-black hover:text-white rounded-full"
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </Button>
              
//               <CalendarContent />
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
//           disabled={!startDate || !endDate || isLoading || isOwner || !user}
//           onClick={handleReserva}
//         >
//           {isLoading 
//             ? 'Processando...' 
//             : isOwner
//               ? 'Você é o proprietário'
//               : !user
//                 ? 'Faça login para reservar'
//                 : `Reservar - ${calcularPrecoTotal().toLocaleString('pt-BR', {
//                     style: 'currency',
//                     currency: 'AOA',
//                   })}`
//           }
//         </Button>

//         {startDate && endDate && (
//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <div className="underline">
//                 {tipoReserva === 'turistico'
//                   ? `${imovel.preco?.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })} x ${calcularDuracaoReserva()} noites`
//                   : `${imovel.precoMensal?.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })} x ${Math.ceil(calcularDuracaoReserva() / 30)} meses`
//                 }
//               </div>
//               <div>
//                 {calcularPrecoTotal().toLocaleString('pt-BR', {
//                   style: 'currency',
//                   currency: 'AOA',
//                 })}
//               </div>
//             </div>

//             <Separator />

//             <div className="flex justify-between items-center font-bold">
//               <div>Total</div>
//               <div>
//                 {calcularPrecoTotal().toLocaleString('pt-BR', {
//                   style: 'currency',
//                   currency: 'AOA',
//                 })}
//               </div>
//             </div>
//           </div>
//         )}
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
//           position: relative;
//         }

//         .custom-airbnb-calendar .react-datepicker__day:hover:not(.react-datepicker__day--disabled) {
//           background-color: #222222;
//           color: white;
//           border-radius: 0;
//         }

//         .custom-airbnb-calendar .react-datepicker__day--selected {
//           background-color: #000;
//           color: white;
//           border-radius: 0;
//         }

//         .custom-airbnb-calendar .react-datepicker__day--in-range {
//           background-color: #000;
//           color: #fff;
//           border-radius: 0;
//         }

//         .custom-airbnb-calendar .disabled-date {
//           width: 100%;
//           height: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
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
//           margin-bottom: 2.5rem;
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
//           position: relative;
//         }

//         .react-datepicker__day.booked-date::after {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           color: #ff0000;
//           font-size: 14px;
//         }

//         .react-datepicker__day.booked-date:hover {
//           background-color: #f0f0f0 !important;
//           color: #999 !important;
//           cursor: not-allowed;
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { 
  addMonths, 
  subMonths, 
  addYears, 
  isSameDay, 
  isWithinInterval, 
  differenceInDays, 
  format, 
  parse, 
  isAfter, 
  isBefore 
} from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { useUser } from "@/hooks/getUser";

enum TipoAluguel {
  TURISTICO = 'turistico',
  RESIDENCIAL = 'residencial',
  AMBOS = 'ambos'
}

interface RentalCardProps {
  imovel: {
    id: string;
    titulo: string;
    preco: number;
    precoMensal?: number;
    tipoAluguel: TipoAluguel;
    proprietarioId: string;
  };
}

const RentalCard: React.FC<RentalCardProps> = ({ imovel }) => {
  const { user, loading: userLoading } = useUser();
  const [tipoReserva, setTipoReserva] = useState<'turistico' | 'residencial'>('turistico');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'checkin' | 'checkout'>('checkin');
  const [bookedDates, setBookedDates] = useState<{ start: Date; end: Date; tipo: TipoAluguel }[]>([]);
  const [leftMonth, setLeftMonth] = useState(new Date());
  const [rightMonth, setRightMonth] = useState(addMonths(new Date(), 1));
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>('');

  const TODAY = new Date();

  const generateMonthOptions = () => {
    const options = [];
    const currentDate = new Date();
    for (let i = 0; i < 24; i++) {
      const date = addMonths(currentDate, i);
      const value = format(date, 'yyyy-MM');
      const label = format(date, 'MMMM yyyy', { locale: ptBR });
      options.push({ value, label });
    }
    return options;
  };

  const monthOptions = generateMonthOptions();

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await fetch(`/api/aluguel?imovelId=${imovel.id}`);
        if (!response.ok) throw new Error('Erro ao buscar datas de aluguel');
        const data = await response.json();
        const dates = data.map((aluguel: any) => ({
          start: new Date(aluguel.checkIn),
          end: new Date(aluguel.checkOut),
          tipo: aluguel.tipoAluguel
        }));
        setBookedDates(dates);
      } catch (error) {
        console.error('Erro ao buscar datas de aluguel:', error);
        toast.error("Não foi possível carregar as datas de aluguel.");
      }
    };

    fetchBookedDates();
  }, [imovel.id]);

  const validateDateSelection = (newStartDate: Date | null, newEndDate: Date | null) => {
    if (!newStartDate || !newEndDate) return true;
    if (isAfter(newStartDate, newEndDate)) {
      toast.error("A data de check-in não pode ser posterior à data de check-out");
      return false;
    }
    if (tipoReserva === 'residencial') {
      const days = differenceInDays(newEndDate, newStartDate) + 1;
      if (days < 90) {
        toast.warning("Aluguel residencial requer no mínimo 3 meses (90 dias)");
        return false;
      }
    }
    for (let d = new Date(newStartDate); d <= newEndDate; d.setDate(d.getDate() + 1)) {
      if (isDateBooked(new Date(d))) {
        toast.error("Existem datas indisponíveis no período selecionado");
        return false;
      }
    }
    return true;
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    if (tipoReserva === 'turistico') {
      if (activeTab === 'checkin') {
        if (!isDateBooked(date)) {
          const isValid = validateDateSelection(date, endDate);
          if (isValid) {
            setStartDate(date);
            setActiveTab('checkout');
          }
        }
      } else {
        if (startDate && !isDateBooked(date)) {
          const isValid = validateDateSelection(startDate, date);
          if (isValid) {
            setEndDate(date);
            setIsCalendarOpen(false);
          }
        }
      }
    } else {
      if (!startDate) {
        if (!isDateBooked(date)) {
          setStartDate(date);
        } else {
          toast.error("Data inicial indisponível");
        }
      } else {
        const minimumEndDate = addMonths(startDate, 3);
        if (isBefore(date, minimumEndDate)) {
          toast.warning("Aluguel residencial requer no mínimo 3 meses (90 dias)");
          return;
        }
        const isValid = validateDateSelection(startDate, date);
        if (isValid) {
          setEndDate(date);
          setIsCalendarOpen(false);
        }
      }
    }
  };

  const isDateBooked = (date: Date) => {
    return bookedDates.some(booking => 
      isWithinInterval(date, { start: booking.start, end: booking.end })
    );
  };

  const handleMonthChange = (increment: boolean) => {
    if (increment) {
      setLeftMonth(addMonths(leftMonth, 1));
      setRightMonth(addMonths(rightMonth, 1));
    } else {
      setLeftMonth(subMonths(leftMonth, 1));
      setRightMonth(subMonths(rightMonth, 1));
    }
  };

  const handleResidentialMonthSelect = (value: string) => {
    const selectedDate = parse(value, 'yyyy-MM', new Date());
    setLeftMonth(selectedDate);
    setRightMonth(addMonths(selectedDate, 1));
    setSelectedMonth(value);
  };

  const handleClearDates = () => {
    setStartDate(null);
    setEndDate(null);
    setActiveTab('checkin');
  };

  const calcularDuracaoReserva = () => {
    if (!startDate || !endDate) return 0;
    return differenceInDays(endDate, startDate) + 1;
  };

  const calcularPrecoTotal = () => {
    if (!startDate || !endDate) return 0;
    const dias = calcularDuracaoReserva();
    if (tipoReserva === 'turistico') {
      return dias * (imovel.preco || 0);
    } else {
      const meses = Math.ceil(dias / 30);
      return meses * (imovel.precoMensal || 0);
    }
  };

  const handleReserva = async () => {
    if (!startDate || !endDate) {
      toast.warning("Selecione as datas de reserva");
      return;
    }
    if (!validateDateSelection(startDate, endDate)) {
      return;
    }
    if (user?.id === imovel.proprietarioId) {
      toast.error("Você não pode alugar seu próprio imóvel");
      return;
    }
    if (!user) {
      toast.error("Você precisa estar logado para fazer uma reserva");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/aluguel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imovelId: imovel.id,
          inquilinoId: user.id,
          checkIn: startDate,
          checkOut: endDate,
          periodoAluguel: calcularDuracaoReserva(),
          tipoAluguel: tipoReserva,
          status: 'pendente',
          preco: calcularPrecoTotal()
        }),
      });
      if (!response.ok) throw new Error('Erro ao criar aluguel');
      toast.success(`Reserva criada com sucesso para ${calcularDuracaoReserva()} ${tipoReserva === 'turistico' ? 'noites' : 'dias'}.`);
      setBookedDates([...bookedDates, {
        start: startDate,
        end: endDate,
        tipo: tipoReserva === 'turistico' ? TipoAluguel.TURISTICO : TipoAluguel.RESIDENCIAL
      }]);
      handleClearDates();
    } catch (error) {
      console.error('Erro ao criar aluguel:', error);
      toast.error("Não foi possível criar a reserva. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const isDateInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return isWithinInterval(date, { start: startDate, end: endDate });
  };

  const CalendarContent = () => (
    <div className="flex gap-4">
      <div className="w-1/2">
        <ShadcnCalendar
          mode="single"
          selected={startDate || undefined}
          onSelect={handleDateSelect}
          month={leftMonth}
          onMonthChange={(newMonth) => setLeftMonth(newMonth)}
          locale={ptBR}
          disabled={(date) => 
            isDateBooked(date) || 
            date < TODAY || 
            date > addYears(TODAY, 1)
          }
          className="custom-airbnb-calendar"
          modifiers={{
            booked: bookedDates.flatMap(booking => {
              const dates = [];
              let currentDate = new Date(booking.start);
              while (currentDate <= booking.end) {
                dates.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
              }
              return dates;
            }),
            inRange: startDate && endDate ? (date) => isDateInRange(date) : [],
          }}
          modifiersStyles={{
            booked: {
              textDecoration: 'line-through',
              opacity: 0.5,
              backgroundColor: '#f0f0f0',
            },
            inRange: {
              backgroundColor: '#000',
              color: '#fff',
            },
            selected: {
              backgroundColor: '#000',
              color: '#fff',
            },
          }}
        />
      </div>
      <div className="w-1/2">
        <ShadcnCalendar
          mode="single"
          selected={endDate || undefined}
          onSelect={handleDateSelect}
          month={rightMonth}
          onMonthChange={(newMonth) => setRightMonth(newMonth)}
          locale={ptBR}
          disabled={(date) => 
            isDateBooked(date) || 
            (startDate && date < startDate) || 
            date < TODAY || 
            date > addYears(TODAY, 1)
          }
          className="custom-airbnb-calendar"
          modifiers={{
            booked: bookedDates.flatMap(booking => {
              const dates = [];
              let currentDate = new Date(booking.start);
              while (currentDate <= booking.end) {
                dates.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
              }
              return dates;
            }),
            inRange: startDate && endDate ? (date) => isDateInRange(date) : [],
          }}
          modifiersStyles={{
            booked: {
              textDecoration: 'line-through',
              opacity: 0.5,
              backgroundColor: '#f0f0f0',
            },
            inRange: {
              backgroundColor: '#000',
              color: '#fff',
            },
            selected: {
              backgroundColor: '#000',
              color: '#fff',
            },
          }}
        />
      </div>
    </div>
  );

  const isOwner = user?.id === imovel.proprietarioId;

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="pb-4 px-6">
        <div className="text-2xl font-bold">
          {tipoReserva === 'turistico' 
            ? `${imovel.preco?.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })} noite`
            : `${imovel.precoMensal?.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })} mês`
          }
        </div>
        {isOwner && (
          <div className="text-sm text-red-500 font-medium mt-2">
            Você é o proprietário deste imóvel e não pode alugá-lo.
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4 px-6">
        <Tabs 
          value={tipoReserva} 
          onValueChange={(value) => {
            setTipoReserva(value as 'turistico' | 'residencial');
            handleClearDates();
          }}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="turistico">Turístico</TabsTrigger>
            <TabsTrigger value="residencial">Residencial</TabsTrigger>
          </TabsList>
        </Tabs>

        <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <DialogTrigger asChild>
            <div className="grid grid-cols-2 border rounded-lg cursor-pointer">
              <div className="p-3 text-left hover:bg-gray-50 border-r">
                <div className="text-xs font-medium">CHECK-IN</div>
                <div>{startDate ? format(startDate, 'dd/MM/yyyy') : 'Adicionar data'}</div>
              </div>
              <div className="p-3 text-left hover:bg-gray-50">
                <div className="text-xs font-medium">CHECKOUT</div>
                <div>{endDate ? format(endDate, 'dd/MM/yyyy') : 'Adicionar data'}</div>
              </div>
            </div>
          </DialogTrigger>

          <DialogContent className="p-4 max-w-3xl min-h-[600px]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                {startDate && endDate ? (
                  <div>
                    <div className="text-lg font-semibold">
                      {calcularDuracaoReserva()} {tipoReserva === 'turistico' ? 'noites' : 'dias'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {format(startDate, 'dd/MM/yyyy')} - {format(endDate, 'dd/MM/yyyy')}
                    </div>
                  </div>
                ) : (
                  <div className="text-lg font-semibold">
                    {tipoReserva === 'turistico' 
                      ? 'Selecione as datas da sua estadia'
                      : 'Selecione as datas (mínimo 3 meses)'}
                  </div>
                )}
              </div>

              {tipoReserva === 'turistico' && (
                <div className="flex items-center gap-2">
                  <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'checkin' | 'checkout')} className="w-auto">
                    <TabsList className="p-0 h-auto bg-transparent">
                      <TabsTrigger
                        value="checkin"
                        className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-4 py-2"
                      >
                        <div className="text-left">
                          <div className="text-xs font-medium">CHECK-IN</div>
                          <div>{startDate ? format(startDate, 'dd/MM/yyyy') : 'Selecionar'}</div>
                        </div>
                      </TabsTrigger>
                      <div className="border-r h-12 mx-2"></div>
                      <TabsTrigger
                        value="checkout"
                        className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-4 py-2"
                      >
                        <div className="text-left">
                          <div className="text-xs font-medium">CHECKOUT</div>
                          <div>{endDate ? format(endDate, 'dd/MM/yyyy') : 'Selecionar'}</div>
                        </div>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              )}
            </div>

            {/* Botões de navegação movidos para fora do container relativo */}
            <div className="flex justify-between mb-4">
              <Button
                onClick={() => handleMonthChange(false)}
                variant="ghost"
                size="icon"
                className="hover:bg-black hover:text-white rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => handleMonthChange(true)}
                variant="ghost"
                size="icon"
                className="hover:bg-black hover:text-white rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="relative">
              <CalendarContent />
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
          disabled={!startDate || !endDate || isLoading || isOwner || !user}
          onClick={handleReserva}
        >
          {isLoading 
            ? 'Processando...' 
            : isOwner
              ? 'Você é o proprietário'
              : !user
                ? 'Faça login para reservar'
                : `Reservar - ${calcularPrecoTotal().toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'AOA',
                  })}`
          }
        </Button>

        {startDate && endDate && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="underline">
                {tipoReserva === 'turistico'
                  ? `${imovel.preco?.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })} x ${calcularDuracaoReserva()} noites`
                  : `${imovel.precoMensal?.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })} x ${Math.ceil(calcularDuracaoReserva() / 30)} meses`
                }
              </div>
              <div>
                {calcularPrecoTotal().toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'AOA',
                })}
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center font-bold">
              <div>Total</div>
              <div>
                {calcularPrecoTotal().toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'AOA',
                })}
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <style jsx global>{`
        .custom-airbnb-calendar {
          width: 100%;
          border: none;
          background: white;
          min-height: 380px;
        }

        .custom-airbnb-calendar .calendar-day {
          margin: 2px;
          width: 40px;
          height: 40px;
          line-height: 40px;
          border-radius: 0;
          color: #484848;
          cursor: pointer;
          position: relative;
        }

        .custom-airbnb-calendar .calendar-day:hover:not([disabled]) {
          background-color: #222222;
          color: white;
          border-radius: 0;
        }

        .custom-airbnb-calendar .calendar-day[disabled] {
          cursor: not-allowed;
          opacity: 0.5;
          background-color: #f0f0f0;
          text-decoration: line-through;
        }
      `}</style>
    </Card>
  );
};

export default RentalCard;