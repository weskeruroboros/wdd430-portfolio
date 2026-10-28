"use client";

import { useState, useEffect } from 'react';

export default function Footer() {  
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gray-800 text-white py-4 mt-12">
      <div className="container mx-auto text-center">
        <p>Copyright &copy; {currentYear} | Edward Tiyari | All rights reserved</p>
      </div>
    </footer>
  );
}