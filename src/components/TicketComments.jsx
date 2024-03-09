import React, { useState, useEffect } from "react";
import { getComments, createComment, updateComment } from "../api/comments";
import { AiFillSetting } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { BiSolidEditAlt } from "react-icons/bi";

const TicketComments = ({
  ticketNumber,
  formatTimestamp,
  userData,
  createCommentActive,
  setCreateCommentActive,
}) => {
  const [comments, setComments] = useState([]);
  const [editCommentActive, setEditCommentActive] = useState(false);

  const fetchTicketComments = async () => {
    const response = await getComments(ticketNumber);
    // console.log(response);
    setComments(response);
  };

  useEffect(() => {
    fetchTicketComments();
  }, []);

  return (
    <div className="flex flex-col grow">
      {createCommentActive ? (
        <div className="flex flex-col grow px-3 py-1.5 bg-slate-700 rounded-md text-sm mt-2">
          <div className="flex text-white">
            <p className="flex whitespace-nowrap">
              Submitted By:{" "}
              <span className="font-semibold">{userData.name}</span>
            </p>
            <div className="flex justify-end grow">
              <IoMdClose
                className="text-white text-xl hover: cursor-pointer"
                onClick={() => setCreateCommentActive(false)}
              />
            </div>
          </div>
          <textarea
            id="newCommentDescription"
            maxLength={2000}
            className="flex grow text-black px-1 py-1 rounded-sm min-h-[150px] whitespace-pre-line mt-2 mb-0"
            placeholder="Add a comment..."
          ></textarea>
          <div className="flex justify-end grow">
            <button
              className="bg-green-500 text-white rounded-md px-2 py-1 mt-2 hover:bg-green-600"
              onClick={async (e) => {
                await createComment(
                  ticketNumber,
                  userData.name,
                  document.getElementById("newCommentDescription").value
                );
                setCreateCommentActive(false);
                fetchTicketComments();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      ) : null}
      {comments.length ? (
        comments.map((comment, index) => {
          return (
            <div
              key={index}
              className="flex flex-col bg-slate-700 rounded-md p-2 mt-2"
            >
              <div className="flex px-2 text-white text-sm">
                <div className="flex">
                  <p className="hidden pr-2 sm:flex">Submitted By: </p>
                  <p className="font-semibold">{comment.author}</p>
                </div>
                <div className="flex justify-end grow">
                  {comment.edited === true ? (
                    <p>Edited: {formatTimestamp(comment.dateEdited)} </p>
                  ) : (
                    <p>{formatTimestamp(comment.date)}</p>
                  )}
                </div>
                {userData.name === comment.author &&
                editCommentActive === index ? (
                  <div className=""></div>
                ) : userData.name === comment.author ? (
                  <div className="ml-3">
                    <BiSolidEditAlt
                      className="text-lg mt-[1px] hover:cursor-pointer"
                      onClick={(e) => setEditCommentActive(index)}
                    />
                  </div>
                ) : null}
              </div>
              <div className="flex px-2 py-1 text-white">
                {editCommentActive === index ? (
                  <div className="flex flex-col grow mt-1">
                    <textarea
                      maxLength={2000}
                      className="flex grow text-black px-1 py-1 rounded-sm min-h-[150px] whitespace-pre-line"
                      id="commentDescription"
                      defaultValue={comment.comment}
                    ></textarea>
                    <div className="flex justify-end grow">
                      <IoMdClose
                        className="text-2xl text-white mt-[14px] mr-2 hover:cursor-pointer"
                        onClick={(e) => setEditCommentActive(null)}
                      />
                      <button
                        className="bg-green-500 text-white rounded-md px-2 py-1 mt-3 hover:bg-green-600 text-sm"
                        onClick={async (e) => {
                          await updateComment(
                            comment._id,
                            document.getElementById("commentDescription").value,
                            userData.name,
                            ticketNumber
                          );
                          setEditCommentActive(null);
                          fetchTicketComments();
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="font-semibold text-sm whitespace-pre-wrap py-2">
                    {comment.comment}
                  </p>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div>
          {!createCommentActive ? (
            <div>No comments created....</div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default TicketComments;
