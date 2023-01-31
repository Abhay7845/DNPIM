import React from "react";

const ProductDetailsTabular = (props) => {
  console.log("props==>", props);
  return (
    <>
      <table className="w-100 mx-1">
        <tbody>
          <tr>
            <th>COLLECTION</th>
            <td>-&emsp;&emsp;&emsp;</td>
            <td style={{ fontWeight: "bold" }}>
              {props.information.collection}
            </td>
          </tr>
          <tr>
            <th>NEED STATE</th>
            <td>-</td>
            <td style={{ fontWeight: "bold" }}>
              {props.information.consumerBase}
            </td>
          </tr>
          <tr>
            <th>GROUP</th>
            <td>-</td>
            <td style={{ fontWeight: "bold" }}>{props.information.itGroup}</td>
          </tr>
          <tr>
            <th>CATEGORY</th>
            <td>-</td>
            <td style={{ fontWeight: "bold" }}>{props.information.category}</td>
          </tr>
          <tr>
            <th>GENDER</th>
            <td>-</td>
            <td style={{ fontWeight: "bold" }}>{props.information.gender}</td>
          </tr>
          <tr>
            <th>COMPLEXITY</th>
            <td>-</td>
            <td style={{ fontWeight: "bold" }}>
              {props.information.complexity}
            </td>
          </tr>
          <tr>
            <th>STD WT</th>
            <td>-</td>
            <td style={{ fontWeight: "bold" }}>{props.information.stdWt}</td>
          </tr>
          <tr>
            <th>STD UCP</th>
            <td>-</td>
            <td style={{ fontWeight: "bold" }}>{props.information.stdUCP}</td>
          </tr>
          <tr>
            <th>METAL COLOR</th>
            <td>-</td>
            <td style={{ fontWeight: "bold" }}>{props.information.colourWt}</td>
          </tr>
          <tr>
            <th>FINDINGS</th>
            <td>-</td>
            <td style={{ fontWeight: "bold" }}>{props.information.findings}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ProductDetailsTabular;
