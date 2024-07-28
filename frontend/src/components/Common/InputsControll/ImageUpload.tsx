import React, { useState } from "react";
import { Form, Modal, Upload, UploadFile } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { PlusOutlined } from "@ant-design/icons";
import type { RcFile, UploadProps } from "antd/es/upload";
import { CafeType } from "../../../utils/types";
import { EMPTY, FORM_FIELD_CONSTANT } from "../../../utils/constant";

interface InputProps {
  fieldName: string;
  name?: FORM_FIELD_CONSTANT.LOGO;
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ImageUpload = (props: InputProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(EMPTY);
  const [previewTitle, setPreviewTitle] = useState(EMPTY);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { fieldName, name } = props;

  const { control, setError, clearErrors, setValue } =
    useFormContext<CafeType>();

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);

      return file.preview;
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    const file = handlePreview(newFileList[0]);

    file.then((image) => {
      setValue(FORM_FIELD_CONSTANT.LOGO, image);
    });
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/webp";
    if (!isJpgOrPng) {
      return setError(FORM_FIELD_CONSTANT.LOGO, {
        type: "custom",
        message: "You can only upload JPG/PNG file!",
      });
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      return setError(FORM_FIELD_CONSTANT.LOGO, {
        type: "custom",
        message: "Image must smaller than 2MB!",
      });
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Controller
      control={control}
      name={name as FORM_FIELD_CONSTANT.LOGO}
      render={({ field: { name, value, onChange }, fieldState: { error } }) => (
        <Form.Item
          label={fieldName}
          validateStatus={error?.message ? "error" : EMPTY}
          help={error?.message && error.message}
        >
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-circle"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            maxCount={1}
            multiple={false}
            beforeUpload={beforeUpload}
            name="avatar"
            onRemove={() => clearErrors([FORM_FIELD_CONSTANT.LOGO])}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </Form.Item>
      )}
    />
  );
};

export default ImageUpload;
