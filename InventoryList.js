import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const inventoryCol = collection(db, 'inventory');
      const inventorySnapshot = await getDocs(inventoryCol);
      const inventoryList = inventorySnapshot.docs.map(doc => doc.data());
      setInventory(inventoryList);
    };
    fetchInventory();
  }, []);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Item Name</TableCell>
          <TableCell>Quantity</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {inventory.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.quantity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default InventoryList;
