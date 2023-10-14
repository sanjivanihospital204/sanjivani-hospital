import React from 'react';

const RecordTable = ({ records }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Weight</th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Contact Number</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {records.map((item) => (
            <tr key={item._id}>
              <td className="px-6 py-4 whitespace-no-wrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{new Date(item.date).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{item.address}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{item.weight}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{item.contactNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordTable;
