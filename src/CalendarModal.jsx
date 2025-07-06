import Calendar from 'react-calendar'; // assuming this
import 'react-calendar/dist/Calendar.css';

const CalendarModal = ({ onDateSelect }) => {
  const handleDateChange = (value) => {
    const formatted = value.toISOString().split('T')[0];
    onDateSelect(formatted);
  };

  return <Calendar onChange={handleDateChange} />;
};

export default CalendarModal;
