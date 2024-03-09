import React from "react";
import moment from "moment";

const AuditLog = ({ auditLog }) => {
  console.log(auditLog);
  const sortedLog = [...auditLog].sort(
    (a, b) => moment(b[1]).toDate() - moment(a[1]).toDate()
  );

  return (
    <div className="flex flex-col grow text-sm">
      {sortedLog.length
        ? sortedLog.map((log, index) => {
            return (
              <div
                key={index}
                className="flex my-1 py-2 bg-slate-700 text-white px-3 rounded-md"
              >
                {log[0]}
                <div className="flex justify-end grow whitespace-nowrap">
                  {log[1]}
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default AuditLog;
