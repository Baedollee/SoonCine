import React from 'react';
import {
  CommentList,
  IndivComment,
  CommentNickname,
  DeleteButton,
  CommentEditInput,
} from '../../pages/detail/DetailStyled';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
  editCommentList,
  _deleteCommentList,
} from '../../redux/modules/comment';

const Comment = ({ comment, id, inputForm, setInputForm }) => {
  const [editDisabled, setEditDisabled] = useState(true);
  const [editContent, setEditContent] = useState(comment.content);
  const dispatch = useDispatch();

  const onDelete = (e) => {
    e.preventDefault();
    dispatch(_deleteCommentList(comment.id));
  };

  // const onEdit = (e) => {
  //   e.preventDefault();
  //   const pay = {
  //     comment_id: comment.id,
  //     postId: { id }.id,
  //     content: comment.content,
  //   };
  //   if (inputForm) {
  //     dispatch(editCommentList(pay));
  //   } else {
  //     alert('다시 적으세요');
  //   }
  // };

  const openModal = () => {
    setEditDisabled(!editDisabled);
    if (!editDisabled) {
      const payloadData = {
        comment_id: comment.id,
        postId: { id }.id,
        content: editContent,
      };
      dispatch(editCommentList(payloadData));
    }
  };

  return (
    <CommentList>
      <IndivComment>
        <CommentNickname> {comment.author} </CommentNickname>
        {/* <CommentContent> {comment.content} </CommentContent> */}
        <CommentEditInput
          onChange={(e) => {
            setEditContent(e.target.value);
          }}
          value={editDisabled ? comment.content : editContent}
          disabled={editDisabled}
        />
        <DeleteButton onClick={onDelete}>🗑️</DeleteButton>
        {/* <button onClick={onEdit}>수정하기</button> */}
        <button onClick={openModal}>
          {editDisabled ? '수정' : '수정완료'}
        </button>
      </IndivComment>
    </CommentList>
  );
};

export default Comment;
