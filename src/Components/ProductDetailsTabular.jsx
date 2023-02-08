import React from "react";

const ProductDetailsTabular = (props) => {
  return (
    <>
      <table className="w-100 mx-1">
        <tbody>
          <tr>
            <th>COLLECTION</th>
            <td>-&emsp;&emsp;&emsp;</td>
            <td>{props.information.collection}</td>
          </tr>
          <tr>
            <th>NEED STATE</th>
            <td>-</td>
            <td>{props.information.consumerBase}</td>
          </tr>
          <tr>
            <th>GROUP</th>
            <td>-</td>
            <td>{props.information.itGroup}</td>
          </tr>
          <tr>
            <th>CATEGORY</th>
            <td>-</td>
            <td>{props.information.category}</td>
          </tr>
          <tr>
            <th>GENDER</th>
            <td>-</td>
            <td>{props.information.gender}</td>
          </tr>
          <tr>
            <th>COMPLEXITY</th>
            <td>-</td>
            <td>{props.information.complexity}</td>
          </tr>
          <tr>
            <th>STD WT</th>
            <td>-</td>
            <td>{props.information.stdWt}</td>
          </tr>
          <tr>
            <th>STD UCP</th>
            <td>-</td>
            <td>{props.information.stdUCP}</td>
          </tr>
          <tr>
            <th>METAL COLOR</th>
            <td>-</td>
            <td>{props.information.colourWt}</td>
          </tr>
          <tr>
            <th>FINDINGS</th>
            <td>-</td>
            <td>{props.information.findings}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ProductDetailsTabular;
