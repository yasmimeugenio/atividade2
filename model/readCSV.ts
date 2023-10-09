import fs from 'fs';

export interface Data {
  id:number;
  title: string;
  value: number;
}

import csv from 'csv-parser';


const readCSV = async (filePath: string): Promise<Data[]> => {
  return new Promise((resolve, reject) => {
    const results: Data[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data: Data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};


export default readCSV;

import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';

const writeCSV = async (filePath: string, data: Data[]): Promise<void> => {
  const csvWriter = createCsvWriter({
    path: filePath,
    header: [
      { id: 'id', title: 'id' },
      { id: 'title', title: 'title' },
      { id: 'value', title: 'value' },
    ],
    append: true, // append data to existing file
  });

  return csvWriter.writeRecords(data);
};


export default writeCSV;