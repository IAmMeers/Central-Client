//create the table here for the stores
import React from 'react';
import './App.css';
function Menupage() {
  return (
    <div className="App">
    <h1>Students Table</h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Roll Number</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Akram</td>
          <td>21</td>
          <td>Male</td>
          <td>2019MEB1235</td>
        </tr>
        <tr>
          <td>Jason</td>
          <td>22</td>
          <td>Male</td>
          <td>2018CSB1234</td>
        </tr>
        <tr>
          <td>Dave</td>
          <td>20</td>
          <td>Female</td>
          <td>2019eeb1242</td>
        </tr>
        <tr>
          <td>Tom</td>
          <td>20</td>
          <td>Male</td>
          <td>2019mmb1235</td>
        </tr>
        <tr>
          <td>Stark</td>
          <td>20</td>
          <td>Male</td>
          <td>2019meb1290</td>
        </tr>
      </tbody>
    </table>
  </div>
);
}
export default Menupage