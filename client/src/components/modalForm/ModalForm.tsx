import React, { useCallback, useEffect, useState } from "react";
import { Modal, Box, Button, TextField, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import classes from "./ModalForm.module.css";
import { TableRecord } from "../../services/slices/tableSliceTypes";

interface ModalFormProps {
  open: boolean;
  onClose: () => void;
  record: TableRecord | null;
  onSave: (updatedRecord: TableRecord, id?: string) => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ open, onClose, record, onSave }) => {
  const [formData, setFormData] = useState<TableRecord | null>(
    record || {
      id: "",
      documentStatus: "",
      employeeNumber: "",
      documentType: "",
      documentName: "",
      companySignatureName: "",
      employeeSignatureName: "",
      employeeSigDate: "",
      companySigDate: "",
    }
  );

  useEffect(() => {
    if (record) {
      setFormData(record);
    } else {
      setFormData({
        id: "",
        documentStatus: "",
        employeeNumber: "",
        documentType: "",
        documentName: "",
        companySignatureName: "",
        employeeSignatureName: "",
        employeeSigDate: "",
        companySigDate: "",
      });
    }
  }, [record]);
  console.log("Modal");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (formData) {
        setFormData((prevData) => ({ ...prevData!, [name]: value }));
      }
    },
    [formData]
  );

  const handleSubmit = useCallback(() => {
    if (formData) {
      if (record) {
        onSave(formData, formData.id);
      } else {
        onSave(formData);
      }
    }
  }, [formData, onSave]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={classes.modalContent}>
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>

        <Typography className={classes.title} variant="h6">
          {record ? "Редактировать запись" : "Добавить запись"}
        </Typography>

        {formData && (
          <Box className={classes.forms}>
            <TextField name="id" label="ID" value={formData.id} onChange={handleChange} />
            <TextField name="documentStatus" label="Статус документа" value={formData.documentStatus} onChange={handleChange} />
            <TextField name="employeeNumber" label="Номер сотрудника" value={formData.employeeNumber} onChange={handleChange} />
            <TextField name="documentType" label="Тип документа" value={formData.documentType} onChange={handleChange} />
            <TextField name="documentName" label="Название документа" value={formData.documentName} onChange={handleChange} />
            <TextField name="companySignatureName" label="Подпись компании" value={formData.companySignatureName} onChange={handleChange} />
            <TextField name="employeeSignatureName" label="Подпись сотрудника" value={formData.employeeSignatureName} onChange={handleChange} />
            <TextField type="datetime-local" name="employeeSigDate" label="Дата подписи сотрудника" value={formData.employeeSigDate} onChange={handleChange} />
            <TextField type="datetime-local" name="companySigDate" label="Дата подписи компании" value={formData.companySigDate} onChange={handleChange} />
            <Button className={classes.saveBtn} variant="contained" onClick={handleSubmit}>
              Сохранить
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default React.memo(ModalForm);
