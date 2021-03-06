import { XIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { range } from "lodash";
import * as React from "react";
import { DropzoneOptions, DropzoneRootProps, FileRejection, useDropzone } from "react-dropzone";

/* eslint-disable @next/next/no-img-element */

const pretty = require("prettysize");

interface ImagesFormProps {
    fieldName?: string;
    heading: string;
    subheading: string;
    previews?: Array<{
        id: string;
        name: string;
        url: string;
    }>;
    labelsList?: {
        [key: string]: string;
    };
    wrapperClasses?: string;
    options?: DropzoneOptions;
    onFileChange: (files: Array<File>) => void;
    onRemove: (id: string) => void;
}

interface RejectedImagesProps {
    labelsList: {
        [key: string]: string;
    };
    rejectedImages: Array<FileRejection>;
}

interface PreviewProps {
    id: string;
    name: string;
    url: string;
    onRemove: (id: string) => void;
}

interface UploadProps {
    RootProps: DropzoneRootProps;
    labelsList: {
        [key: string]: string;
    };
    isDragActive: boolean;
}

interface RemoveProps {
    hidden?: boolean;
    id: string;
    onRemove: (id: string) => void;
}

const Remove: React.FunctionComponent<RemoveProps> = ({ onRemove, id, hidden = false }) => {
    const btnClasses = classNames("inline-flex items-center p-1 border mt-1 ml-1", {
        "border-transparent rounded-full shadow-sm text-white bg-gray-600": true,
        "hover:bg-gray-700": true,
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500": true
    });

    const onItemClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        onRemove(id);
    };

    if (hidden) return null;
    return (
        <div className="absolute">
            <button type="button" onClick={onItemClick} className={btnClasses}>
                <XIcon className="h-5" aria-hidden="true" />
            </button>
        </div>
    );
};

const Upload: React.FunctionComponent<UploadProps> = ({ RootProps, isDragActive, labelsList }) => {
    return (
        <li {...RootProps} className="relative focus:outline-none">
            <div className="flex justify-center px-4 py-5 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-500">
                <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <p className="mt-1 text-xs text-gray-600">
                        {isDragActive && <span>{labelsList.dropFiles}</span>}
                        {!isDragActive && (
                            <span>
                                <button
                                    type="button"
                                    className="font-medium text-gray-600 hover:text-gray-500 focus:outline-none focus:underline transition duration-150 ease-in-out"
                                >
                                    {labelsList.selectFile}
                                </button>{" "}
                                {labelsList.orDragAndDrop}
                            </span>
                        )}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">{labelsList.filesFormat}</p>
                </div>
            </div>
        </li>
    );
};

export const Preview: React.FunctionComponent<PreviewProps> = (props) => {
    const { name, url: imageUrl } = props;
    const imageClasses = classNames("focus:outline-none group block w-full aspect-w-10 aspect-h-7 rounded-md overflow-hidden");

    return (
        <li className="relative">
            <div className={imageClasses}>
                <img src={imageUrl} alt={name} className="group-hover:opacity-75 object-cover pointer-events-none" />
                <button type="button" className="absolute inset-0">
                    <span className="sr-only">{name}</span>
                </button>
                <Remove {...props} />
            </div>
            <p className="mt-2 block text-xs font-medium text-gray-900 truncate pointer-events-none">{name}</p>
        </li>
    );
};

export const RejectedImages: React.FunctionComponent<RejectedImagesProps> = ({ rejectedImages, labelsList }) => {
    const nextRejectedImages = rejectedImages.map((image) => {
        return {
            ...image,
            preview: URL.createObjectURL(image.file)
        };
    });

    return (
        <div className="flex flex-col mt-3">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {labelsList.file}
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {labelsList.errors}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td colSpan={2}>
                                        <p className="text-sm text-red-500 py-2 px-2">{labelsList.correctErrors}</p>
                                    </td>
                                </tr>
                                {nextRejectedImages.map(({ file, preview, errors }, idx: number) => (
                                    <tr key={idx}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img className="h-10 w-10 rounded-full" src={preview} alt={file.name} />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{file.name}</div>
                                                    <div className="text-xs text-gray-500">{pretty(file.size)}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <ul className="text-xs">
                                                {errors.map((e) => (
                                                    <li key={e.code}>{e.message}</li>
                                                ))}
                                            </ul>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ImagesForm: React.FunctionComponent<ImagesFormProps> = ({
    heading,
    subheading,
    onRemove,
    wrapperClasses: _classes = "my-3 focus:bg-gray-400",
    options = { maxFiles: 6 },
    onFileChange,
    fieldName = "images",
    labelsList = {
        file: "File",
        correctErrors: "Please try again. Correct the following error(s).",
        errors: "Errors",
        dropFiles: "Drop files here",
        filesFormat: "PNG, JPG, GIF up to 2MB",
        selectFile: "Select a file",
        orDragAndDrop: "or drag and drop"
    },
    previews
}) => {
    // on drop
    const onDrop = React.useCallback(
        (acceptedFiles) => {
            onFileChange(acceptedFiles);
        },
        [onFileChange]
    );

    // options
    const _options = {
        ...options,
        maxFiles: (options.maxFiles || 6) - ((previews && previews.length) || 0)
    };

    // use dropzone
    const { getRootProps, getInputProps, fileRejections, isDragActive } = useDropzone({
        ..._options,
        onDrop
    });

    // container clsses
    const wrapperClasses = classNames("relative", _classes);
    const listClasses = classNames("grid", "grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8");

    return (
        <div className={wrapperClasses}>
            <div className="flex-grow flex flex-col mb-3">
                <span className="text-sm font-medium text-gray-900">{heading}</span>
                <span className="text-xs text-gray-500">{subheading}</span>
            </div>
            <input name={fieldName} {...getInputProps({ multiple: true })} />
            <ul className={listClasses}>
                {previews && previews.length > 0 && previews.map((preview, idx: number) => <Preview key={idx} onRemove={onRemove} {...preview} />)}
                {range(_options.maxFiles, options.maxFiles).map((idx: number) => (
                    <Upload key={idx} RootProps={getRootProps()} isDragActive={isDragActive} labelsList={labelsList} />
                ))}
            </ul>

            {fileRejections && fileRejections.length > 0 && <RejectedImages rejectedImages={fileRejections} labelsList={labelsList} />}
        </div>
    );
};

export default ImagesForm;
