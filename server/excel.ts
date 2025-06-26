import * as XLSX from 'xlsx';
import fs from 'fs';

const filePath = 'leads.xlsx';

export const saveLead = (lead: any) => {
  let data: any[] = [];

  if (fs.existsSync(filePath)) {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    data = XLSX.utils.sheet_to_json(sheet);
  }

  data.push(lead);

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');

  XLSX.writeFile(workbook, filePath);
};