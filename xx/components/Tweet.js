import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Tweet({ tweet }) {
    const { navigate } = useNavigation();

    const navigateToProfile = (userName) => {
        navigate("Profile", { username: userName });
    };

    const navigateToTweetDetail = (tweetId) => {
        navigate("TweetDetail", { _id: tweetId });
    };

    return (
        <View key={tweet.id} style={styles.tweets}>
            <TouchableOpacity onPress={() => navigateToProfile(tweet.authorDetail.username)}>
                <Image
                    source={{ uri: 'https://randomuser.me/api/portraits/men/' + Math.floor(Math.random() * 100) + '.jpg' }}
                    style={styles.avatar}
                />
            </TouchableOpacity>

            <View style={styles.tweetContent}>
                <TouchableOpacity
                    style={styles.tweetContentTouchable}
                    onPress={() => navigateToTweetDetail(tweet._id)}
                    activeOpacity={0.7}
                >
                    <View style={styles.tweetHeader}>
                        <Text style={styles.name}>{tweet.authorDetail.name}</Text>
                        <Text style={styles.handle}>@{tweet.authorDetail.username}</Text>
                        <Text style={styles.time}>· {new Date(tweet.createdAt).toDateString()}</Text>
                    </View>
                    <Text style={styles.tweetText}>{tweet.content}</Text>
                </TouchableOpacity>

                <View style={styles.tweetActions}>
                    <TouchableOpacity style={styles.action}>
                        <FontAwesome name="comment-o" size={18} color="#657786" />
                        <Text style={styles.actionText}>{tweet.comments?.length || 0}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action}>
                        <AntDesign name="retweet" size={18} color="#657786" />
                        <Text style={styles.actionText}>{tweet.retweets || 0}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action}>
                        <AntDesign name="hearto" size={18} color="#657786" />
                        <Text style={styles.actionText}>{tweet.likes?.length || 0}</Text>
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
    tweets: {
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