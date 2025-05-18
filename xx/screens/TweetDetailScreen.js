import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Feather, AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function TweetDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // Get tweet data from route params, or use fallback data
  const tweet = route.params?.tweet || {
    id: '1',
    name: 'John Doe',
    handle: '@johndoe',
    time: '2h',
    date: 'May 18 · 2023',
    content: 'Just learned React Native, and it\'s amazing! The component-based architecture makes it so intuitive to build mobile apps. #reactnative #javascript #mobiledev',
    likes: 25,
    retweets: 5,
    comments: 3,
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  };

  // State for new reply
  const [replyText, setReplyText] = useState('');

  // Sample replies
  const [replies, setReplies] = useState([
    {
      id: 'r1',
      name: 'Jane Smith',
      handle: '@janesmith',
      time: '1h',
      content: 'React Native is definitely a game changer! Are you using Expo or bare workflow?',
      likes: 3,
      retweets: 0,
      comments: 1,
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      id: 'r2',
      name: 'Tech Enthusiast',
      handle: '@techlover',
      time: '30m',
      content: 'Try adding Redux for state management. It works great with React Native!',
      likes: 2,
      retweets: 0,
      comments: 0,
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
  ]);

  // Function to add a new reply
  const handleAddReply = () => {
    if (replyText.trim() === '') return;

    const newReply = {
      id: `r${replies.length + 1}`,
      name: 'Me',
      handle: '@myhandle',
      time: 'Just now',
      content: replyText,
      likes: 0,
      retweets: 0,
      comments: 0,
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    };

    setReplies([newReply, ...replies]);
    setReplyText('');
  };

  // Function to navigate to a user's profile
  const navigateToProfile = (userData) => {
    navigation.navigate("Profile", { userData });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Main Tweet */}
        <View style={styles.tweetContainer}>
          <View style={styles.tweetHeader}>
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={() => navigateToProfile({
                name: tweet.name,
                handle: tweet.handle,
                avatar: tweet.avatar
              })}
            >
              <Image source={{ uri: tweet.avatar }} style={styles.avatar} />
            </TouchableOpacity>

            <View style={styles.userInfo}>
              <TouchableOpacity
                onPress={() => navigateToProfile({
                  name: tweet.name,
                  handle: tweet.handle,
                  avatar: tweet.avatar
                })}
              >
                <Text style={styles.userName}>{tweet.name}</Text>
              </TouchableOpacity>
              <Text style={styles.userHandle}>{tweet.handle}</Text>
            </View>

            <TouchableOpacity style={styles.moreButton}>
              <Feather name="more-horizontal" size={18} color="#657786" />
            </TouchableOpacity>
          </View>

          <View style={styles.tweetContent}>
            <Text style={styles.tweetText}>{tweet.content}</Text>

            <Text style={styles.tweetTime}>{tweet.time} · {tweet.date}</Text>
          </View>
        </View>

        {/* Reply Composer */}
        <View style={styles.replyComposer}>
          <Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} style={styles.replyAvatar} />
          <TextInput
            style={styles.replyInput}
            placeholder="Post your reply"
            placeholderTextColor="#657786"
            multiline
            value={replyText}
            onChangeText={setReplyText}
          />
          <TouchableOpacity
            style={[
              styles.replyButton,
              !replyText.trim() && styles.replyButtonDisabled
            ]}
            disabled={!replyText.trim()}
            onPress={handleAddReply}
          >
            <Text style={styles.replyButtonText}>Reply</Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Replies */}
        <View style={styles.repliesContainer}>
          {replies.map(reply => (
            <View key={reply.id} style={styles.replyItem}>
              <TouchableOpacity
                onPress={() => navigateToProfile({
                  name: reply.name,
                  handle: reply.handle,
                  avatar: reply.avatar
                })}
              >
                <Image source={{ uri: reply.avatar }} style={styles.replyItemAvatar} />
              </TouchableOpacity>

              <View style={styles.replyContent}>
                <View style={styles.replyHeader}>
                  <TouchableOpacity
                    onPress={() => navigateToProfile({
                      name: reply.name,
                      handle: reply.handle,
                      avatar: reply.avatar
                    })}
                  >
                    <Text style={styles.replyName}>{reply.name}</Text>
                  </TouchableOpacity>
                  <Text style={styles.replyHandle}>{reply.handle}</Text>
                  <Text style={styles.replyTime}>· {reply.time}</Text>
                </View>

                <Text style={styles.replyText}>{reply.content}</Text>

                <View style={styles.replyActions}>
                  <TouchableOpacity style={styles.replyAction}>
                    <FontAwesome name="comment-o" size={15} color="#657786" />
                    <Text style={styles.actionCount}>{reply.comments}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.replyAction}>
                    <AntDesign name="retweet" size={15} color="#657786" />
                    <Text style={styles.actionCount}>{reply.retweets}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.replyAction}>
                    <AntDesign name="hearto" size={15} color="#657786" />
                    <Text style={styles.actionCount}>{reply.likes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.replyAction}>
                    <Feather name="share" size={15} color="#657786" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E1E8ED',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  tweetContainer: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E1E8ED',
  },
  tweetHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  userHandle: {
    color: '#657786',
    fontSize: 14,
  },
  moreButton: {
    padding: 5,
  },
  tweetContent: {
    paddingTop: 10,
    // backgroundColor: 'red'
  },
  tweetText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10,
  },
  tweetTime: {
    fontSize: 14,
    color: '#657786',
    marginBottom: 15,
  },
  tweetStats: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#E1E8ED',
    paddingVertical: 10,
    marginBottom: 10,
  },
  statItem: {
    flexDirection: 'row',
    marginRight: 20,
  },
  statNumber: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  statLabel: {
    color: '#657786',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E1E8ED',
    marginHorizontal: 10,
  },
  tweetActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  actionButton: {
    padding: 8,
  },
  replyComposer: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  replyAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  replyInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E1E8ED',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  replyButton: {
    backgroundColor: '#1DA1F2',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  replyButtonDisabled: {
    backgroundColor: '#8ED0F9', // Lighter blue for disabled state
  },
  replyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  divider: {
    height: 10,
    backgroundColor: '#F5F8FA',
  },
  repliesContainer: {
    padding: 15,
  },
  replyItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  replyItemAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  replyContent: {
    flex: 1,
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  replyName: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  replyHandle: {
    color: '#657786',
    marginRight: 5,
  },
  replyTime: {
    color: '#657786',
  },
  replyText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 5,
  },
  replyActions: {
    flexDirection: 'row',
    marginTop: 5,
  },
  replyAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionCount: {
    fontSize: 12,
    color: '#657786',
    marginLeft: 5,
  },
});