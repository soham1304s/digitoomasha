const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'db4grmmiw',
  api_key: process.env.CLOUDINARY_API_KEY || '633486411435833',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'bpkgQl8Ub847zQQVxbyrW4kUn08'
});

// POST /api/upload-avatar
router.post('/upload-avatar', async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ success: false, message: 'No image data provided.' });
    }

    // Re-apply Cloudinary config from current env
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'db4grmmiw',
      api_key: process.env.CLOUDINARY_API_KEY || '633486411435833',
      api_secret: process.env.CLOUDINARY_API_SECRET || 'bpkgQl8Ub847zQQVxbyrW4kUn08'
    });

    // Attempt Cloudinary CDN Upload
    const uploadResult = await cloudinary.uploader.upload(image, {
      folder: 'digitoomasha_avatars',
      resource_type: 'auto'
    });

    console.log('✅ Cloudinary Image Upload Success:', uploadResult.secure_url);

    return res.json({
      success: true,
      message: 'Avatar uploaded to Cloudinary successfully.',
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id
    });
  } catch (error) {
    console.warn('⚠️ Cloudinary Upload Error (Using Data URI Fallback):', error.message || error);
    
    // Seamless Fallback: Return the image base64 data URI directly so the UI updates without breaking
    return res.json({
      success: true,
      fallback: true,
      message: 'Cloudinary CDN not configured or invalid credentials. Using base64 fallback.',
      url: req.body.image
    });
  }
});

// POST /api/upload/media (Social Media Attachments Cloudinary Upload)
router.post('/upload/media', async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ success: false, message: 'No media data provided.' });
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'db4grmmiw',
      api_key: process.env.CLOUDINARY_API_KEY || '633486411435833',
      api_secret: process.env.CLOUDINARY_API_SECRET || 'bpkgQl8Ub847zQQVxbyrW4kUn08'
    });

    const uploadResult = await cloudinary.uploader.upload(image, {
      folder: 'digitoomasha_social_media',
      resource_type: 'auto'
    });

    console.log('✅ Cloudinary Social Media Attachment Upload Success:', uploadResult.secure_url);

    return res.json({
      success: true,
      message: 'Media uploaded to Cloudinary successfully.',
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id
    });
  } catch (error) {
    console.warn('⚠️ Cloudinary Media Upload Error (Using Data URI Fallback):', error.message || error);

    return res.json({
      success: true,
      fallback: true,
      message: 'Cloudinary CDN upload fallback.',
      url: req.body.image
    });
  }
});

module.exports = router;
