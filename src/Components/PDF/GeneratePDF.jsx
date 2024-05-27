import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function GeneratePDF({ transactions }) {
  const PDFGenerator = () => {
    const doc = new jsPDF();

    doc.text("Transacciones", 95, 20);

    const columns = [
    "ID","Product Name",	"Pattern",	"StatTrak"	,"Float"	,"Customer Name"	,"Order Date"	,"Order Total"
    ];
    
    const data = transactions.map(transaction => [
      new Date(transaction.created_at).toLocaleDateString(),
      transaction.id,
      `$${transaction.total_price.toFixed(2)}`
    ]);

    doc.autoTable({
      startY: 30,
      head: [columns],
      body: data
    });

    doc.save("transacciones.pdf");
  };

  return (
    <button 
      onClick={PDFGenerator}
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      Generar PDF de Transacciones
    </button>
  );
}

export default GeneratePDF;
