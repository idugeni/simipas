import React, { useState, useEffect } from 'react';
import { ShiftType, UserInput } from '../lib/types';
import './App.css';

interface LogMessage {
  timestamp: string;
  level: string;
  message: string;
}

const LogViewer: React.FC = () => {
  const [logs, setLogs] = useState<LogMessage[]>([]);

  useEffect(() => {
    window.api.onLogMessage((log: LogMessage) => {
      setLogs(prevLogs => [...prevLogs, log]);
    });
  }, []);

  return (
    <div className="log-viewer">
      <h2>Log Output</h2>
      <div className="log-container">
        {logs.map((log, index) => (
          <div key={index} className={`log-entry log-${log.level}`}>
            {log.message}
          </div>
        ))}
      </div>
    </div>
  );
};

declare global {
  interface Window {
    api: {
      runAutomation: (userInput: UserInput) => Promise<{ success: boolean; result?: any; error?: string }>;
      onLogMessage: (callback: (log: { timestamp: string; level: string; message: string }) => void) => void;
    };
  }
}

const App: React.FC = () => {
  const [shiftType, setShiftType] = useState<ShiftType>('Siang');
  const [date, setDate] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const formatDateForBackend = (dateStr: string): string => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setStatus('idle');

    let userInput: UserInput;

    if (shiftType === 'ALL') {
      userInput = {
        shiftType,
        startDate: formatDateForBackend(startDate),
        endDate: formatDateForBackend(endDate)
      };
    } else {
      userInput = {
        shiftType,
        date: formatDateForBackend(date)
      };
    }

    try {
      const result = await window.api.runAutomation(userInput);
      if (result.success) {
        setMessage('Otomasi berhasil dijalankan!');
        setStatus('success');
      } else {
        setMessage(`Error: ${result.error}`);
        setStatus('error');
      }
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : String(error)}`);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>SIMIPAS</h1>
        <p>Sistem Otomatisasi Jurnal Harian SIMPEG</p>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="shiftType">Pilih Shift:</label>
            <select
              id="shiftType"
              value={shiftType}
              onChange={(e) => setShiftType(e.target.value as ShiftType)}
              disabled={isLoading}
            >
              <option value="Siang">Shift Siang</option>
              <option value="PagiMalam">Shift Pagi dan Malam</option>
              <option value="LepasMalam">Lepas Piket Malam</option>
              <option value="ALL">Semua Shift</option>
            </select>
          </div>

          {shiftType !== 'ALL' ? (
            <div className="form-group">
              <label htmlFor="date">Tanggal:</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="startDate">Tanggal Mulai:</label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="endDate">Tanggal Berakhir:</label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  disabled={isLoading}
                  required
                  min={startDate}
                />
              </div>
            </>
          )}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Sedang Berjalan...' : 'Jalankan Otomasi'}
          </button>
        </form>

        {message && (
          <div className={`message ${status}`}>
            {message}
          </div>
        )}

        <LogViewer />
      </main>

      <footer>
        <p>SIMIPAS v0.1.7-alpha | <a href="https://github.com/idugeni/simipas" target="_blank" rel="noreferrer">GitHub</a></p>
      </footer>
    </div>
  );
};

export default App;