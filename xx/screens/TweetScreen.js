import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Feather, FontAwesome, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function TweetScreen({ navigation }) {
    const [tweetContent, setTweetContent] = useState('');
    const [charCount, setCharCount] = useState(0);
    const MAX_CHARS = 280;
    const inputRef = useRef(null);

    // User data (would normally come from auth context/state)
    const user = {
        name: 'John Doe',
        handle: '@johndoe',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    };

    // Focus input when component mounts
    React.useEffect(() => {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    }, []);

    const handleTweetChange = (text) => {
        setTweetContent(text);
        setCharCount(text.length);
    };

    const handlePostTweet = () => {
        // In a real app, you would dispatch an action to post the tweet
        console.log('Posting tweet:', tweetContent);
        navigation?.goBack();
    };

    const remainingChars = MAX_CHARS - charCount;
    const isOverLimit = remainingChars < 0;

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.closeButton} onPress={() => navigation?.goBack()}>
                    {/* <Feather name="x" size={24} color="black" /> */}
                    <Text style={{ fontSize: 18 }}>Cancel</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.draftButton}>
                    <Text style={styles.draftText}>Drafts</Text>
                </TouchableOpacity> */}

                <TouchableOpacity
                    style={[
                        styles.tweetButton,
                        (!tweetContent.trim() || isOverLimit) && styles.tweetButtonDisabled
                    ]}
                    disabled={!tweetContent.trim() || isOverLimit}
                    onPress={handlePostTweet}
                >
                    <Text style={[
                        styles.tweetButtonText,
                        (!tweetContent.trim() || isOverLimit) && styles.tweetButtonTextDisabled
                    ]}>Post</Text>
                </TouchableOpacity>
            </View>

            {/* Composition Area */}
            <View style={styles.compositionArea}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />

                <View style={styles.inputContainer}>
                    <TextInput
                        ref={inputRef}
                        style={styles.tweetInput}
                        placeholder="What's happening?"
                        placeholderTextColor="#657786"
                        multiline
                        maxLength={MAX_CHARS + 20} // Allow typing a little over limit but disable posting
                        value={tweetContent}
                        onChangeText={handleTweetChange}
                    />
                </View>
            </View>

            {/* Privacy Selector */}
            {/* <TouchableOpacity style={styles.privacySelector}>
                <MaterialCommunityIcons name="earth" size={16} color="#1DA1F2" />
                <Text style={styles.privacyText}>Everyone can reply</Text>
                <Ionicons name="chevron-down" size={16} color="#1DA1F2" />
            </TouchableOpacity> */}

            {/* Media Options and Character Count */}
            <View style={styles.bottomBar}>
                {/* <View style={styles.mediaOptions}>
                    <TouchableOpacity style={styles.mediaOption}>
                        <Feather name="image" size={22} color="#1DA1F2" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mediaOption}>
                        <Feather name="search" size={22} color="#1DA1F2" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mediaOption}>
                        <MaterialCommunityIcons name="chart-bar" size={22} color="#1DA1F2" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mediaOption}>
                        <MaterialCommunityIcons name="emoticon-outline" size={22} color="#1DA1F2" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mediaOption}>
                        <Feather name="calendar" size={22} color="#1DA1F2" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mediaOption}>
                        <Feather name="map-pin" size={22} color="#1DA1F2" />
                    </TouchableOpacity>
                </View> */}

                <View style={styles.characterCount}>
                    {charCount > 0 && (
                        <>
                            {remainingChars <= 20 && (
                                <View style={[
                                    styles.charCountCircle,
                                    remainingChars <= 0 && styles.charCountCircleRed
                                ]}>
                                    <Text style={[
                                        styles.charCountText,
                                        remainingChars <= 0 && styles.charCountTextRed
                                    ]}>
                                        {Math.abs(remainingChars)}
                                    </Text>
                                </View>
                            )}
                            {remainingChars > 20 && (
                                <Text style={styles.charCountRegular}>{remainingChars}</Text>
                            )}
                        </>
                    )}
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 40,
        paddingBottom: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: '#E1E8ED',
    },
    closeButton: {
        padding: 5,
    },
    draftButton: {
        padding: 5,
    },
    draftText: {
        color: '#1DA1F2',
        fontSize: 16,
    },
    tweetButton: {
        backgroundColor: '#1DA1F2',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 18,
    },
    tweetButtonDisabled: {
        backgroundColor: '#8ED0F9', // Lighter blue
    },
    tweetButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    tweetButtonTextDisabled: {
        color: '#FFFFFF',
    },
    compositionArea: {
        flexDirection: 'row',
        padding: 15,
        flex: 1,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    inputContainer: {
        flex: 1,
    },
    tweetInput: {
        fontSize: 18,
        lineHeight: 26,
        maxHeight: 300,
        textAlignVertical: 'top',
    },
    privacySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderTopWidth: 0.5,
        borderTopColor: '#E1E8ED',
    },
    privacyText: {
        color: '#1DA1F2',
        marginLeft: 5,
        marginRight: 3,
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 0.5,
        borderTopColor: '#E1E8ED',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    mediaOptions: {
        flexDirection: 'row',
    },
    mediaOption: {
        marginRight: 20,
    },
    characterCount: {
        paddingRight: 10,
    },
    charCountCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#1DA1F2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    charCountCircleRed: {
        borderColor: '#E0245E',
        backgroundColor: '#E0245E',
    },
    charCountText: {
        color: '#1DA1F2',
        fontSize: 12,
        fontWeight: 'bold',
    },
    charCountTextRed: {
        color: '#FFFFFF',
    },
    charCountRegular: {
        color: '#657786',
    },
});