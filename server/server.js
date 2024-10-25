import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const PORT = 5000;
const app = express();
const SECRET_KEY = "your_secret_key";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));

let data = [
  {
    id: uuidv4(),
    documentStatus: "Approved",
    employeeNumber: "12345",
    documentType: "Invoice",
    documentName: "Invoice #001",
    companySignatureName: "John Doe",
    employeeSignatureName: "Jane Smith",
    employeeSigDate: new Date().toISOString().slice(0, 16),
    companySigDate: new Date().toISOString().slice(0, 16),
  },
  {
    id: uuidv4(),
    documentStatus: "Pending",
    employeeNumber: "67890",
    documentType: "Contract",
    documentName: "Contract #002",
    companySignatureName: "Alice Johnson",
    employeeSignatureName: "Bob Brown",
    employeeSigDate: new Date().toISOString().slice(0, 16),
    companySigDate: new Date().toISOString().slice(0, 16),
  },
];

const lineChartData = {
  uData: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
  pData: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
  sData: [1000, 1200, 4500, 2888, 3100, 2500, 1200],
  xLabels: ["Page A", "Page B", "Page C", "Page D", "Page E", "Page F", "Page G"],
};

const barChartData = {
  data: [{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }],
  xAxisData: [{ scaleType: "band", data: ["group A", "group B", "group C"] }],
};

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (/^user[1-9][0-9]{0,2}$/.test(username) && parseInt(username.slice(4)) <= 200 && password === "password") {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    return res.status(200).json({
      error_code: 0,
      data: { token, username },
    });
  }

  return res.status(401).json({
    error_code: 1,
    error_message: "Invalid username or password",
  });
});

app.get("/data", (req, res) => {
  const token = req.headers["x-auth"];

  if (!token) {
    return res.status(401).json({
      error_code: 1,
      error_message: "No token provided",
    });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error_code: 2,
        error_message: "Invalid token",
      });
    }

    return res.status(200).json({
      error_code: 0,
      data: data,
    });
  });
});

app.get("/lineChartData", (req, res) => {
  const token = req.headers["x-auth"];

  if (!token) {
    return res.status(401).json({
      error_code: 1,
      error_message: "No token provided",
    });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error_code: 2,
        error_message: "Invalid token",
      });
    }

    return res.status(200).json({
      error_code: 0,
      data: lineChartData,
    });
  });
});

app.get("/barChartData", (req, res) => {
  const token = req.headers["x-auth"];

  if (!token) {
    return res.status(401).json({
      error_code: 1,
      error_message: "No token provided",
    });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error_code: 2,
        error_message: "Invalid token",
      });
    }

    return res.status(200).json({
      error_code: 0,
      data: barChartData,
    });
  });
});

app.delete("/delete/:id", (req, res) => {
  const token = req.headers["x-auth"];

  if (!token) {
    return res.status(401).json({
      error_code: 1,
      error_message: "No token provided",
    });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error_code: 2,
        error_message: "Invalid token",
      });
    }

    const { id } = req.params;
    const index = data.findIndex((item) => item.id === id);

    if (index === -1) {
      return res.status(404).json({
        error_code: 3,
        error_message: "Record not found",
      });
    }

    data.splice(index, 1);

    return res.status(200).json({
      error_code: 0,
      message: "Record deleted successfully",
    });
  });
});

app.post("/edit/:id", (req, res) => {
  const token = req.headers["x-auth"];

  if (!token) {
    return res.status(401).json({
      error_code: 1,
      error_message: "No token provided",
    });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error_code: 2,
        error_message: "Invalid token",
      });
    }

    const { id } = req.params;
    const updatedData = req.body;

    const recordIndex = data.findIndex((item) => item.id === id);

    if (recordIndex === -1) {
      return res.status(404).json({
        error_code: 3,
        error_message: "Record not found",
      });
    }

    data[recordIndex] = { ...data[recordIndex], ...updatedData };

    return res.status(200).json({
      error_code: 0,
      message: "Record updated successfully",
      data: data[recordIndex],
    });
  });
});

app.post("/add", (req, res) => {
  const token = req.headers["x-auth"];

  // Проверка токена
  if (!token) {
    return res.status(401).json({
      error_code: 1,
      error_message: "No token provided",
    });
  }

  // Валидация токена
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error_code: 2,
        error_message: "Invalid token",
      });
    }

    const newRecord = req.body;

    newRecord.id = uuidv4();

    data.push(newRecord);

    return res.status(200).json({
      error_code: 0,
      message: "Record added successfully",
      data: newRecord,
    });
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error starting server: ${err.message}`);
  } else {
    console.log(`Server started on ${PORT}`);
  }
});
