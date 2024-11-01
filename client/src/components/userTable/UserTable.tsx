import React, { useCallback, useEffect, useState, memo } from "react";
import { Box, Typography } from "@mui/material";
import classes from "./UserTable.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../services/store/store";
import { addNewRecord, deleteRecord, getTable, updateRecord } from "../../services/slices/tableSlice";
import { useNavigate } from "react-router-dom";
import TableUI from "../tableUI/TableUI";
import ModalForm from "../modalForm/ModalForm";
import SimpleLineChart from "../simpleLineChart/SimpleLineChart";
import SimpleBarChart from "../simpleBarChart/SimpleBarChart";
import { getBarChartData, getLineChartData } from "../../services/slices/chartsSlice";
import { selectBarChartData, selectData, selectlineChartData } from "../../services/selectors/selectors";
import { BarChartData, LineChartData } from "../../services/slices/chartsSliceTypes";
import { TableRecord } from "../../services/slices/tableSliceTypes";

const UserTable = () => {
  const tableData: TableRecord[] = useSelector(selectData);
  const lineData: LineChartData = useSelector(selectlineChartData);
  const barData: BarChartData = useSelector(selectBarChartData);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const token = localStorage.getItem("refreshToken");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<TableRecord | null>(null);

  useEffect(() => {
    if (token) {
      dispatch(getTable({ token: token }));
      dispatch(getLineChartData({ token: token }));
      dispatch(getBarChartData({ token: token }));
    } else {
      navigate("/");
    }
  }, [dispatch, navigate]);

  const handleDelete = useCallback(
    (id: string) => {
      if (token) {
        dispatch(deleteRecord({ token: token, id: id }));
      }
    },
    [token]
  );

  const handleAdd = useCallback(() => {
    setSelectedRecord(null);
    setModalOpen(true);
  }, []);

  const handleEdit = useCallback((record: TableRecord) => {
    setSelectedRecord(record);
    setModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    setSelectedRecord(null);
  }, []);

  const handleSave = useCallback(
    (recordData: TableRecord, id?: string) => {
      if (token) {
        if (id) {
          dispatch(updateRecord({ token: token, id, recordData }));
        } else {
          dispatch(addNewRecord({ token: token, recordData }));
        }
      }
      handleModalClose();
    },
    [dispatch, token]
  );
  return (
    <Box className={classes.container}>
      <Typography className={classes.title} variant="h2" component="h2">
        Examples of tables
      </Typography>
      {tableData && tableData.length > 0 ? <TableUI tableData={tableData} onDelete={handleDelete} onEdit={handleEdit} handleAdd={handleAdd} /> : <Typography>Данные отсутствуют</Typography>}
      <Typography className={classes.title} variant="h2" component="h2">
        Examples of graphs
      </Typography>
      <Box className={classes.simpleContainer}>
        <SimpleLineChart lineChartData={lineData} />
        <SimpleBarChart barChartData={barData} />
      </Box>
      <ModalForm open={modalOpen} onClose={handleModalClose} record={selectedRecord} onSave={handleSave} />
    </Box>
  );
};

export default memo(UserTable);
