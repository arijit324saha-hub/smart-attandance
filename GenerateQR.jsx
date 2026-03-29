import { QRCodeCanvas } from "qrcode.react";

export default function GenerateQR() {

  const attendanceData = {
    class: "CSE",
    time: new Date().toISOString()
  };

  return (
    <div className="flex flex-col items-center justify-center">

      <h1 className="text-xl mb-4">Scan to Mark Attendance</h1>

      <QRCodeCanvas
        value={JSON.stringify(attendanceData)}
        size={250}
      />

    </div>
  );
}