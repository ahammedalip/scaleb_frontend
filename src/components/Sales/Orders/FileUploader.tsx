import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import { Grid } from '@mui/material';

type Props = {
    images: File[];
    setImages: (arg: File[]) => void;
};

const FileUploader = (props: Props) => {
    const maxImagesUpload = 4;
    const inputId = Math.random().toString(32).substring(2);

    const handleOnAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files: File[] = [];

        for (const file of e.target.files) {
            files.push(file);
        }

        props.setImages([...props.images, ...files]);
        e.target.value = '';
    };

    const handleOnRemoveImage = (index: number) => {
        const newImages = [...props.images];
        newImages.splice(index, 1);
        props.setImages(newImages);
    };

    return (
        <>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 8, sm: 12, md: 12 }}>
                {props.images.map((image, i) => (
                    <Grid
                        item
                        xs={4}
                        sm={4}
                        md={4}
                        key={i}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            padding: 0,
                            margin: 0
                        }}
                    >
                        <IconButton
                            aria-label='delete image'
                            style={{
                                position: 'absolute',
                                top: '12%', // Center the button vertically
                                right: '8%', // Center the button horizontally
                                transform: 'translate(-50%, -50%)', // Offset the button's center to align with the image's center
                                color: '#aaa'
                            }}
                            onClick={() => handleOnRemoveImage(i)}
                        >
                            <CancelIcon />
                        </IconButton>
                        <img
                            src={URL.createObjectURL(image)}
                            style={{
                                width: '100px',
                                height: '100px',
                                objectFit: 'contain',
                                aspectRatio: '1 / 1'
                            }}
                            alt=''
                        />
                    </Grid>
                ))}
            </Grid>
            <label htmlFor={inputId}>
                <Button variant='contained' disabled={props.images.length >= maxImagesUpload} component='span' sx={{ mt: 4 }}>
                    Upload Files
                </Button>
                <input
                    id={inputId}
                    type='file'
                    multiple
                    accept='image/*,.png,.jpg,.jpeg,.gif'
                    onChange={handleOnAddImage}
                    style={{ display: 'none' }}
                />
            </label>
        </>
    );
};

export default FileUploader;
