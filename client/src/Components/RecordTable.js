import React from 'react';

const RecordTable = ({ records }) => {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Address</th>
          <th className="px-4 py-2">Weight</th>
          <th className="px-4 py-2">Contact Number</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record, index) => (
          <tr key={index}>
            <td className="border px-4 py-2">{record.name}</td>
            <td className="border px-4 py-2">{record.date}</td>
            <td className="border px-4 py-2">{record.address}</td>
            <td className="border px-4 py-2">{record.weight}</td>
            <td className="border px-4 py-2">{record.contactNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecordTable;
