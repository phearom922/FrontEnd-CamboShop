import React from "react";
import brandLogo from "../../../public/Brand_Logo.png";
import moment from "moment";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

import {
  Table,
  TD,
  TH,
  TR,
} from "@ag-media/react-pdf-table";

// Register fonts
import fontDev from "../order/Poppins-Regular.ttf";
import fontBold from "../order/Poppins-Bold.ttf";
Font.register({ family: "Poppins", src: fontDev });
Font.register({ family: "Poppins-Bold", src: fontBold });

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Poppins",
    fontSize: 12,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Poppins-Bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  recipient: {
    fontSize: 12,
    marginBottom: 4,
  },
  status: {
    color: "red",
    fontSize: 12,
    marginTop: 10,
  },
  total: {
    textAlign: "right",
    marginTop: 10,
    fontFamily: "Poppins-Bold",
  },
  date: {
    textAlign: "right",
    fontSize: 12,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
  },
  titleColor: {
    color: "#364153",
  },
  DescriptionFont: {
    fontSize: 10,
  },
  textBold: {
    fontFamily: "Poppins-Bold",
  },
  spaceY: {
    marginTop: 4,
    marginBottom: 4,
  },
  table: {
    width: "100%",
    marginTop: 20,
  },
  td: {
    padding: 4,
  },
  tableHeader: {
    backgroundColor: "#e5e5e5",
  },
  logSize: {
    width: 100,
    height: 25,
  },
  textTotal: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    marginTop: 10,
  },
  sectionPendingTop: {
    marginTop: 20,
  },
});

const Invoice = ({ order }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>INVOICE</Text>
            <Text>Invoice #INV-2024-0001</Text>
          </View>
          <View>
            <Image src={brandLogo} style={styles.logSize} />
            <Text style={styles.textBold}>CaboShoping</Text>
            <Text style={styles.DescriptionFont}>
              Borey New world ChhukVaII No. 118A, St.18,
            </Text>
            <Text style={styles.DescriptionFont}>
              S.K SomrongKroam, Pur SenChey, Phnom Penh.
            </Text>
          </View>
        </View>

        {/* Recipient */}
        <View>
          <Text style={styles.recipient}>
            Recipient: <Text style={styles.textBold}>{order.shippingAddress.fullName}</Text>
          </Text>
          <Text style={styles.DescriptionFont}>
            Phone Number : 0{order.shippingAddress.phoneNumber}
          </Text>
          <Text style={styles.DescriptionFont}>
            Delivery Address : {order.shippingAddress.area}
          </Text>
          <Text style={styles.DescriptionFont}>
            City : {order.shippingAddress.city}
          </Text>
        </View>

        {/* Product Table */}
        <Table data={order.products} style={styles.table}>
          <TH>
            <TD style={[styles.td, styles.tableHeader, styles.textBold]}>Product Name</TD>
            <TD style={[styles.td, styles.tableHeader, styles.textBold]}>Quantity</TD>
            <TD style={[styles.td, styles.tableHeader, styles.textBold]}>Unit Price</TD>
            <TD style={[styles.td, styles.tableHeader, styles.textBold]}>Total</TD>
          </TH>
          {order.products.map((item, index) => (
            <TR key={index}>
              <TD style={[styles.td, styles.titleColor]}>{item.product.title}</TD>
              <TD style={[styles.td, styles.titleColor]}>{item.count}</TD>
              <TD style={[styles.td, styles.titleColor]}>
                ${((item.price - (item.price * item.discount) / 100).toFixed(2))}
              </TD>
              <TD style={[styles.td, styles.titleColor]}>
                ${(((item.price - (item.price * item.discount) / 100) * item.count).toFixed(2))}
              </TD>
            </TR>
          ))}
        </Table>

        {/* Status & Date */}
        <View style={styles.sectionPendingTop}>
          <Text>Date: {moment(order.createdAt).format("DD/MM/YYYY")}</Text>
          <Text style={styles.textTotal}>Total: ${order.cartTotal.toFixed(2)}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
