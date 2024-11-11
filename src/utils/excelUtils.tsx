import * as XLSX from "xlsx";

export const readExcelFile = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const secondSheetName = workbook.SheetNames[1];
      console.log(secondSheetName);
      const worksheetB = workbook.Sheets[firstSheetName];
      const worksheetC = workbook.Sheets[secondSheetName];

      const jsonDataB = XLSX.utils.sheet_to_json(worksheetB, { header: 1 });
      const jsonDataC = XLSX.utils.sheet_to_json(worksheetC, { header: 1 });

      resolve({
        "brand": jsonDataB,
        "comp": jsonDataC,
      });
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

export const validateGioData = (data: any) => {
  const header = ["Longitude", "Latitude"];
  // first check its headers lenght
  if (data[0].length !== header.length) {
    console.log("header leagth not same");
    return false;
  }
  // Now check its headers leve are same or not
  data[0].forEach((element: string, index: number) => {
    if (element !== header[index]) {
      // console.log("header velev not same");
      return false;
    }
  });
  // now check all its value must be number
  // console.log("validateGioData : ", data);

//   for (let i = 1; i < data.length; i++) {
//     if (!Number.isNaN(data[i][0]) || !Number.isNaN(data[i][1])) {
//       console.log("validateGioData : ", data[i][0], data[i][1]);

//       return false;
//     }
//   }

  // finally
  return true;
};
