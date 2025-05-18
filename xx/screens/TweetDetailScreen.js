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
  Platform,
  Alert
} from 'react-native';
import { Feather, AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { gql, useMutation, useQuery } from '@apollo/client';
import getDayDifferenceFromNow from '../helpers/getDay';

const GET_TWEETSBYID = gql`
query Query($id: ID!) {
  postById(_id: $id) {
    _id
    content
    tags
    imgUrl
    authorId
    comments {
      content
      username
      createdAt
      updatedAt
    }
    likes {
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
    commentsUser {
      name
      username
    }
    likesUser {
      name
      username
    }
    authorDetail {
      name
      username
    }
  }
}
`
const COMMENT_TWEET = gql`
mutation Mutation($id: ID!, $content: String!) {
  commentPost(_id: $id, content: $content)
}
`

export default function TweetDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { _id } = route.params;
  const { data, refetch, loading } = useQuery(GET_TWEETSBYID, {
    variables: { id: _id },
  })
  const [addComment, { loading: loadingComment }] = useMutation(COMMENT_TWEET)

  // State for new reply
  const [replyText, setReplyText] = useState('');

  // Function to add a new reply
  const handleAddReply = async () => {
    try {
      const result = await addComment({
        variables: {
          id: _id,
          content: replyText,
        },
      });
      await refetch();
      setReplyText('');
      keyboard.dismiss();
      Alert.alert("Success", "Reply added successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to add reply");
    }
  };

  // Function to navigate to a user's profile
  const navigateToProfile = (userData) => {
    navigation.navigate("Profile", { userData });
  };

  const postById = data?.postById;

  if (loading || loadingComment) {
    return <Text style={{ flex: 1 }}>Loading...</Text>;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
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
                // name: tweet.name,
                // handle: tweet.handle,
                // avatar: tweet.avatar
              })}
            >
              <Image source={{ uri: 'https://randomuser.me/api/portraits/men/' + Math.floor(Math.random() * 100) + '.jpg' }} style={styles.avatar} />
            </TouchableOpacity>

            <View style={styles.userInfo}>
              <TouchableOpacity
                onPress={() => navigateToProfile({
                  // name: tweet.name,
                  // handle: tweet.handle,
                  // avatar: tweet.avatar
                })}
              >
                <Text style={styles.userName}>{postById.authorDetail.name}</Text>
                <Text>@{postById.authorDetail.username}</Text>
              </TouchableOpacity>
              {/* <Text style={styles.userHandle}>{tweet.handle}</Text> */}
            </View>

            <TouchableOpacity style={styles.moreButton}>
              <Feather name="more-horizontal" size={18} color="#657786" />
            </TouchableOpacity>
          </View>

          <View style={styles.tweetContent}>
            <Text style={styles.tweetText}>{postById.content}</Text>

            {/* <Text style={styles.tweetTime}>{getDayDifferenceFromNow(postById.createdAt)}</Text> */}
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
          {postById.comments.map((reply, idx) => (
            <View key={idx} style={styles.replyItem}>
              <TouchableOpacity
                onPress={() => navigateToProfile({
                  name: reply.name,
                  handle: reply.handle,
                  avatar: reply.avatar
                })}
              >
                <Image source={{ uri: 'https://randomuser.me/api/portraits/men/' + Math.floor(Math.random() * 100) + '.jpg' }} style={styles.replyItemAvatar} />
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
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.replyName}>{postById.commentsUser[idx].name}</Text>
                      <Text style={{ fontWeight: "normal" }}>@{postById.commentsUser[idx].username}</Text>
                    </View>
                  </TouchableOpacity>
                  {/* <Text style={styles.replyHandle}>{getDayDifferenceFromNow()}</Text> */}
                  {/* <Text style={styles.replyTime}>· {reply.time}</Text> */}
                </View>

                <Text style={styles.replyText}>{reply.content}</Text>

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