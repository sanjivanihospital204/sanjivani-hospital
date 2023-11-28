import {
    StyleSheet,
    Text,
    View
} from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
    table: {
        display: "table",
        width: "auto",
    },
    tableRow: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
    tableCell: {
        padding: 5,
        textAlign: "center",
        border: 1,
        color: "#003e9b",
        borderRadius: 3,
        borderColor: "#003e9b"
    },
    headerCell: {
        fontSize: 12,
        fontWeight: "bold",
    },
    DoubleCell: {
        fontSize: 10,
        width: "55%",
    },
    cell: {
        fontSize: 10,
        width: "15%",
    },
});

const BillTable = ({ billCharges }) => (
    <View style={styles.table}>
        <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.DoubleCell, styles.headerCell]}>Charge Detail</Text>
            <Text style={[styles.tableCell, styles.cell, styles.headerCell]}>Charge</Text>
            <Text style={[styles.tableCell, styles.cell, styles.headerCell]}>Days</Text>
            <Text style={[styles.tableCell, styles.cell, styles.headerCell]}>Amount</Text>
        </View>
        {billCharges.map((charge) => (
            <View key={charge._id} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.DoubleCell]}>{getChargeDescription(charge.chargeList)}</Text>
                <Text style={[styles.tableCell, styles.cell]}>{getChargeAmount(charge.chargeList)}</Text>
                <Text style={[styles.tableCell, styles.cell]}>{charge.days}</Text>
                <Text style={[styles.tableCell, styles.cell]}>{calculateAmount(charge)}</Text>
            </View>
        ))}
    </View>
);

const getChargeDescription = (chargeList) => {
    // Assuming the chargeList format is "Emergency Tapas Fee - {amount}"
    return chargeList.split("-")[0].trim();
};

const getChargeAmount = (chargeList) => {
    // Assuming the chargeList format is "Emergency Tapas Fee - {amount}"
    const amount = chargeList.split("-")[1].trim();
    return amount;
};

const calculateAmount = (charge) => {
    // Assuming the chargeList format is "Emergency Tapas Fee - {amount}"
    const amount = parseInt(charge.chargeList.split("-")[1].trim());
    return amount * charge.days;
};

export default BillTable;
