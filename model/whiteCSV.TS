import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import { Data } from './data.interface';

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