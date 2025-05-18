import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Tweet({ tweet }) {
    const { navigate } = useNavigation();

    // Navigate to profile
    const navigateToProfile = (userData) => {
        navigate("Profile");
        console.log('userData', userData);
    };

    // Navigate to tweet detail screen
    const navigateToTweetDetail = (tweet) => {
        navigate("TweetDetail", { tweet });
    };

    return (
        <View key={tweet.id} style={styles.tweet}>
            <TouchableOpacity onPress={() => navigateToProfile(tweet.id)}>
                <Image
                    source={{ uri: tweet.avatar }}
                    style={styles.avatar}
                />
            </TouchableOpacity>

            <View style={styles.tweetContent}>
                {/* Make the main tweet content clickable */}
                <TouchableOpacity
                    style={styles.tweetContentTouchable}
                    onPress={() => navigateToTweetDetail(tweet)}
                    activeOpacity={0.7}
                >
                    <View style={styles.tweetHeader}>
                        <Text style={styles.name}>{tweet.name}</Text>
                        <Text style={styles.handle}>{tweet.handle}</Text>
                        <Text style={styles.time}>· {tweet.time}</Text>
                    </View>
                    <Text style={styles.tweetText}>{tweet.content}</Text>
                </TouchableOpacity>

                {/* Keep the action buttons separately so they don't trigger navigation */}
                <View style={styles.tweetActions}>
                    <TouchableOpacity style={styles.action}>
                        <FontAwesome name="comment-o" size={18} color="#657786" />
                        <Text style={styles.actionText}>{tweet.comments}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action}>
                        <AntDesign name="retweet" size={18} color="#657786" />
                        <Text style={styles.actionText}>{tweet.retweets}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action}>
                        <AntDesign name="hearto" size={18} color="#657786" />
                        <Text style={styles.actionText}>{tweet.likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action}>
                        <Feather name="share" size={18} color="#657786" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tweet: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: '#E1E8ED',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    tweetContent: {
        flex: 1,
    },
    tweetContentTouchable: {
        flex: 1,
    },
    tweetHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    name: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    handle: {
        color: '#657786',
        marginRight: 5,
    },
    time: {
        color: '#657786',
    },
    tweetText: {
        fontSize: 16,
        lineHeight: 22,
        marginBottom: 10,
    },
    tweetActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 40,
    },
    action: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionText: {
        marginLeft: 5,
        color: '#657786',
        fontSize: 12,
    },
});