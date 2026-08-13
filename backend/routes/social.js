const express = require('express');
const router = express.Router();
const {
  getAllSocialPosts,
  createSocialPost,
  updateSocialPost,
  deleteSocialPost,
} = require('../db/db');

// Helper to normalize JSON fields if stringified from Postgres
function normalizePost(post) {
  if (!post) return null;
  const isClientAdded = post.is_client_added !== undefined
    ? Boolean(post.is_client_added)
    : (post.isClientAdded !== undefined ? Boolean(post.isClientAdded) : (post.id !== 'sp-101' && post.id !== 'sp-102'));

  const clientEmail = post.client_email || post.clientEmail || post.email || '';

  return {
    ...post,
    platforms: typeof post.platforms === 'string' ? JSON.parse(post.platforms) : (post.platforms || ['Linkedin']),
    scheduledDate: post.scheduled_date || post.scheduledDate,
    scheduledTime: post.scheduled_time || post.scheduledTime,
    publishedAt: post.published_at || post.publishedAt || '',
    projectedReach: post.projected_reach || post.projectedReach || '5.5k',
    isClientAdded,
    is_client_added: isClientAdded,
    clientEmail,
    client_email: clientEmail,
  };
}

// GET /api/social/posts
router.get('/social/posts', async (req, res) => {
  try {
    const rawPosts = await getAllSocialPosts();
    const posts = rawPosts.map(normalizePost);
    return res.json({ success: true, posts, total: posts.length });
  } catch (err) {
    console.error('Get Social Posts Error:', err);
    return res.status(500).json({ success: false, message: 'Server error fetching social posts.' });
  }
});

// POST /api/social/posts
router.post('/social/posts', async (req, res) => {
  try {
    const { title, caption, platforms, status, scheduledDate, scheduledTime, media, category, author, clientEmail, isClientAdded } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Post title or topic is required.' });
    }

    const created = await createSocialPost({
      title,
      caption,
      platforms,
      status,
      scheduledDate,
      scheduledTime,
      media,
      category,
      author,
      clientEmail,
      isClientAdded,
    });

    const post = normalizePost(created);

    if (req.io) {
      req.io.emit('social_post_created', post);
      req.io.emit('post_created', {
        id: post.id,
        title: post.title,
        status: post.status,
        timestamp: new Date().toLocaleTimeString(),
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Social post created successfully.',
      post,
    });
  } catch (err) {
    console.error('Create Social Post Error:', err);
    return res.status(500).json({ success: false, message: 'Server error creating social post.' });
  }
});

// PUT /api/social/posts/:id
router.put('/social/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await updateSocialPost(id, req.body);

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Social post not found.' });
    }

    const post = normalizePost(updated);

    if (req.io) {
      req.io.emit('social_post_updated', post);
    }

    return res.json({
      success: true,
      message: 'Social post updated successfully.',
      post,
    });
  } catch (err) {
    console.error('Update Social Post Error:', err);
    return res.status(500).json({ success: false, message: 'Server error updating social post.' });
  }
});

// POST /api/social/posts/:id/publish (Quick Publish)
router.post('/social/posts/:id/publish', async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await updateSocialPost(id, {
      status: 'Published',
      publishedAt: 'Just Now',
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Social post not found.' });
    }

    const post = normalizePost(updated);

    if (req.io) {
      req.io.emit('social_post_updated', post);
    }

    return res.json({
      success: true,
      message: 'Social post published instantly.',
      post,
    });
  } catch (err) {
    console.error('Publish Social Post Error:', err);
    return res.status(500).json({ success: false, message: 'Server error publishing social post.' });
  }
});

// DELETE /api/social/posts/:id
router.delete('/social/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await deleteSocialPost(id);

    if (req.io) {
      req.io.emit('social_post_deleted', { id });
    }

    return res.json({
      success: true,
      message: 'Social post deleted successfully.',
      id,
    });
  } catch (err) {
    console.error('Delete Social Post Error:', err);
    return res.status(500).json({ success: false, message: 'Server error deleting social post.' });
  }
});

module.exports = router;
