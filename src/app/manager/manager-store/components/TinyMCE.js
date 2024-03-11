'use client'
import React, { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Grid, Box, Button, Stack } from '@mui/material';
import { useAppDispatch } from "@/lib/hooks";
import store from '@/lib/features/storeSlice'

import PreviewPage from './TinyMCE/PreviewPage'

export default function TinyMCE() {

  const dispatch = useAppDispatch()
  const editorRef = useRef(null);

  const handleClickDemo = () => {
    if (editorRef.current) {
      const editorContent = editorRef.current.getContent();
      dispatch(store.actions.onChangeContent(editorContent))
      console.log(editorContent);
    }
  }

  const saveToRedux = () => {
    if (editorRef.current) {
      const editorContent = editorRef.current.getContent();
      dispatch(store.actions.onChangeContent(editorContent));
    }
  }

  return (
    <>
      <Stack direction={'column'} spacing={1}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <PreviewPage handleClickDemo={handleClickDemo}></PreviewPage>
        </Box>
        <Editor
          apiKey='qzmvb0bq15jpqiwg6dv4jdxu9zhkhkqfw3dt6qxfvx61j7y4'
          onInit={(evt, editor) => editorRef.current = editor}
          onChange={(content, editor) => {
            saveToRedux()
          }}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 600,
            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
          }}
        />
      </Stack>
    </>
  );
}
