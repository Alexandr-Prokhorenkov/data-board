import React, { memo } from "react";
import { Box, Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import classes from "./TableUI.module.css";
import { TableRecord } from "../../services/slices/tableSliceTypes";

interface TableUIProps {
  tableData: TableRecord[];
  onDelete: (id: string) => void;
  onEdit: (record: TableRecord) => void;
  handleAdd: () => void;
}

const TableUI: React.FC<TableUIProps> = ({ tableData, onDelete, onEdit, handleAdd }) => {
  return (
    <Box className={classes.container}>
      <Table className={classes.table}>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell className={classes.tableCell}>ID</TableCell>
            <TableCell className={classes.tableCell}>Статус документа</TableCell>
            <TableCell className={classes.tableCell}>Номер сотрудника</TableCell>
            <TableCell className={classes.tableCell}>Тип документа</TableCell>
            <TableCell className={classes.tableCell}>Название документа</TableCell>
            <TableCell className={classes.tableCell}>Подпись компании</TableCell>
            <TableCell className={classes.tableCell}>Подпись сотрудника</TableCell>
            <TableCell className={classes.tableCell}>Дата подписи сотрудника</TableCell>
            <TableCell className={classes.tableCell}>Дата подписи компании</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.documentStatus}</TableCell>
              <TableCell>{row.employeeNumber}</TableCell>
              <TableCell>{row.documentType}</TableCell>
              <TableCell>{row.documentName}</TableCell>
              <TableCell>{row.companySignatureName}</TableCell>
              <TableCell>{row.employeeSignatureName}</TableCell>
              <TableCell>{row.employeeSigDate}</TableCell>
              <TableCell>{row.companySigDate}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="delete"
                  onClick={() => onDelete(row.id)}
                  sx={{
                    color: "grey",
                    transition: "color 0.5s ease",
                    "&:hover": {
                      color: "red",
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="edit" onClick={() => onEdit(row)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={handleAdd} className={classes.addBtn} variant="contained">
        + Добавить
      </Button>
    </Box>
  );
};

export default memo(TableUI);
