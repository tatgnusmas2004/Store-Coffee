import { useEffect, useState } from "react";
import config from "../../api/config";
import './ManageTable.css'
import { useNavigate } from "react-router-dom";

const ManageTable = () => {
  const [tables, setTables] = useState([]); // State lưu danh sách bàn
  const navigate = useNavigate();
  // Hàm gọi API để lấy danh sách bàn
  const fetchTables = async () => {
    try {
      const response = await fetch(config.TABLES_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch table data");
      }
      const data = await response.json();
      setTables(data); // Cập nhật state với dữ liệu nhận được
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  // Gọi API khi component được render lần đầu
  useEffect(() => {
    fetchTables();
  }, []);

  // Hàm xác định màu nền dựa trên tbState
  const getBackgroundColor = (tbState) => {
    switch (tbState) {
      case 1:
        return "green";
      case 2:
        return "orange";
      case 3:
        return "red";
      case 4:
        return "gray";
      case 5:
        return "black";
      default:
        return "white"; // Mặc định màu trắng nếu không khớp
    }
  };

  // Hàm xử lý khi nhấn vào bàn
  const handleTableClick = (tbId) =>
    navigate(`/table/${tbId}`); // Điều hướng đến trang chi tiết bàn

  return (
    <div className="container">
      <h1>Danh sách bàn</h1>
      <div className="table-list-container">
        {tables.map((table) => (
          <div
            className="table-item"
            key={table.tbId}>
            <button
              className="table-btn"
              style={{ backgroundColor: getBackgroundColor(table.tbState) }}
              onClick={() => handleTableClick(table.tbId)}>
              <p>{table.tbName} </p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageTable;