import React from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader'
import InvoiceTableRow from './InvoiceTableRow'
import InvoiceTableBlankSpace from './InvoiceTableBlankSpace'
import InvoiceTableFooter from './InvoiceTableFooter'


const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#bff0fd',
    },
});

  const InvoiceItemsTable = () => (
    <View style={styles.tableContainer}>
        <InvoiceTableHeader />
        <InvoiceTableRow  />
        <InvoiceTableBlankSpace />
        <InvoiceTableFooter  />
    </View>
  );
  
  export default InvoiceItemsTable