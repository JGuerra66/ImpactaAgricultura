'use client'

import { useCallback, Dispatch, SetStateAction } from 'react'
import type { FileWithPath } from '@uploadthing/react'
import { useDropzone } from '@uploadthing/react/hooks'
import { generateClientDropzoneAccept } from 'uploadthing/client'

import { Button } from '@/components/ui/button'
import { convertFileToUrl } from '@/lib/utils'

type FileUploaderProps = {
  onFieldChange: (url: string) => void
  setFiles: Dispatch<SetStateAction<File[]>>
}

export function FileUploader({ onFieldChange, setFiles }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles)
    onFieldChange(convertFileToUrl(acceptedFiles[0]))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'application/vnd.google-earth.kmz' ? generateClientDropzoneAccept(['application/vnd.google-earth.kmz']) : undefined,
  })

  return (
    <div
      {...getRootProps()}
      className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50">
      <input {...getInputProps()} className="cursor-pointer" />

      <div className="flex-center flex-col py-5 text-grey-500">
        <img src="/assets/icons/upload.svg" width={77} height={77} alt="file upload" />
        <h3 className="mb-2 mt-2">Arrastra tu archivo aqui</h3>
        
        <Button type="button" className="rounded-full">
          Seleccionar desde dispositivo
        </Button>
      </div>
    </div>
  )
}