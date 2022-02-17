import { DropzoneArea } from 'material-ui-dropzone'
import { observer } from "mobx-react"
import { useState } from 'react';
import { useStoreMobX } from '../../../store/useStore';

export const FormFiles = observer(() => {
    const { storeVGO } = useStoreMobX()
    const [key, setKey] = useState(0)

    return (
        <DropzoneArea
            key={key}
            maxFileSize={10000000}
            name='files'
            showPreviewsInDropzone={false}
            dropzoneText='Кликните или перетащите сюда файлы'
            filesLimit={7}
            onChange={(files, e) => {
                if (files.length) {
                    setKey(key + 1)
                    storeVGO.setFileList(files)
                }
            }}
        />
    )
})