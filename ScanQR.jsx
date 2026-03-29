import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
import axios from "axios";

export default function ScanQR() {

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250
    });

    scanner.render(success, error);

    function success(decodedText) {
      const user = JSON.parse(localStorage.getItem("user"));

      axios.post("http://localhost:5000/api/attendance/mark", {
        studentId: user._id
      });

      alert("Attendance marked via QR");
      scanner.clear();
    }

    function error(err) {
      console.log(err);
    }

  }, []);

  return (
    <div>
      <h1 className="text-center mb-4">Scan QR Code</h1>
      <div id="reader"></div>
    </div>
  );
}
