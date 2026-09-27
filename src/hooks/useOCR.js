import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';

export const useOCR = () => {
    const [imageUri, setImageUri] = useState(null);
    const [extractedText, setExtractedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const runOCR = async (uri) => {
        setError('');
        setIsLoading(true);

        try {
            const result = await TextRecognition.recognize(uri);
            setExtractedText(result.text);
        } catch (err) {
            setError('Text could not be extracted. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const pickFromGallery = async () => {
        setError('');

        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            setError('Gallery permission denied.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({ quality: 1 });
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            runOCR(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        setError('');

        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
            setError('Camera permission denied.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({ quality: 1 });
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            runOCR(result.assets[0].uri);
        }
    };

    const editExtractedText = (newText) => {
        setExtractedText(newText);
    };

    const clearOCR = () => {
        setImageUri(null);
        setExtractedText('');
        setError('');
    };

    const isError = !!error.trim();
    const clearError = () => setError('');

    return {
        imageUri,
        isLoading,
        takePhoto,
        pickFromGallery,
        extractedText,
        editExtractedText,
        clearOCR,
        isError,
        error,
        clearError,
    };
};