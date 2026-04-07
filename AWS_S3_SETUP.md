# AWS S3 Asset Migration Guide

## ✅ Completed Setup

All your website assets have been configured to load from AWS S3. The following has been done:

### 1. Created Utility Function
- **File**: [lib/assetUrl.ts](lib/assetUrl.ts)
- Function: `getAssetUrl(path: string)` - Converts relative asset paths to S3 URLs
- Fallback: Automatically uses local paths if S3 URL not configured

### 2. Updated All Components
The following components have been updated to use S3 asset URLs:

**Home Components:**
- `components/home/Hero.tsx` - Background image
- `components/home/Mosaic.tsx` - 12 mosaic gallery images
- `components/home/Interactive.tsx` - Interactive videos
- `components/home/Expert.tsx` - Expert section videos
- `components/home/Reels.tsx` - Reel carousel videos
- `components/home/ThreeDSection.tsx` - 3D section videos
- `components/home/Bottom.tsx` - Footer video & image
- `components/home/AIQuote.tsx` - AI quote background

**Layouts:**
- `components/layouts/Header.tsx` - Logo
- `components/layouts/FooterCTA.tsx` - Footer logo

**Other Components:**
- `components/Butterfly.tsx` - Butterfly animation
- `components/Loader.tsx` - Loader logo

**Portfolio:**
- `components/portfolio/CreativePortraits.tsx` - 4 portfolio images
- `components/portfolio/Port.tsx` - Portfolio videos

**Services:**
- `components/services/VisualIdentify.tsx` - Service video
- `components/services/AiPower.tsx` - AI power video
- `components/services/AiBrand.tsx` - Brand video
- `components/services/Digital.tsx` - Digital video

---

## 🚀 Step-by-Step AWS S3 Setup

### Step 1: Create S3 Bucket

1. Go to [AWS Console](https://console.aws.amazon.com/)
2. Search for **S3** and click **Buckets**
3. Click **Create bucket**
4. Configure:
   - **Bucket name**: `ritz-media-assets` (must be globally unique)
   - **Region**: `us-east-1` or your preferred region
   - **Block Public Access settings**: Keep defaults
5. Click **Create bucket**

### Step 2: Enable Public Access & Configure Permissions

1. Go to your bucket → **Permissions** tab
2. **Bucket policy**: Click **Edit** and paste:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::ritz-media-assets/*"
    }
  ]
}
```

3. Click **Save changes**

### Step 3: Get AWS Credentials

1. Go to [IAM Console](https://console.aws.amazon.com/iam/)
2. Click **Users** → **Create user**
3. Enter name: `ritz-media-uploader`
4. Click **Next**
5. Click **Attach policies directly**
6. Search & select: `AmazonS3FullAccess`
7. Click **Next** → **Create user**
8. Click on the user → **Security credentials** tab
9. Click **Create access key** → **CLI**
10. **Copy both keys** and save securely

### Step 4: Install AWS CLI

**Option 1: Using npm (Node.js)**
```bash
npm install -g aws-cli
```

**Option 2: Download from AWS**
- Visit: https://aws.amazon.com/cli/

### Step 5: Configure AWS Credentials

```bash
aws configure
```

Enter when prompted:
- **AWS Access Key ID**: [Paste from Step 3]
- **AWS Secret Access Key**: [Paste from Step 3]
- **Default region**: `us-east-1`
- **Default output format**: `json`

### Step 6: Upload Assets to S3

```bash
cd d:\RitzMediaWorld\ct-website

# Upload all assets with public read access
aws s3 sync public/assets s3://ritz-media-assets/assets --acl public-read
```

Verify upload:
```bash
aws s3 ls s3://ritz-media-assets/assets --recursive
```

### Step 7: Configure Environment Variables

Create/update `.env.local`:

```
NEXT_PUBLIC_AWS_S3_URL=https://ritz-media-assets.s3.amazonaws.com
```

### Step 8: Test Locally

```bash
npm run dev
```

Visit `http://localhost:3000` and verify all images/videos load properly.

### Step 9: Deploy

```bash
npm run build
npm run start
```

---

## 📝 Verification Checklist

- [ ] S3 bucket created
- [ ] Bucket policy configured for public access
- [ ] IAM user created with S3 access
- [ ] AWS CLI installed and credentials configured
- [ ] Assets uploaded to S3
- [ ] `.env.local` configured with S3 URL
- [ ] Local dev server tested
- [ ] All images/videos load from S3
- [ ] Deployed to production

---

## 🔍 Troubleshooting

### Assets Not Loading
1. Check `.env.local` has correct S3 URL
2. Verify bucket name in S3 URL
3. Check browser console for exact URL being requested
4. Ensure bucket policy allows public access

### Upload Failed
```bash
# Check AWS credentials are configured
aws s3 ls

# If no buckets show, reconfigure
aws configure
```

### Slow Performance
- Consider adding CloudFront CDN in front of S3
- Use a region closer to your users

---

## 💰 Cost Optimization

**S3 Pricing:**
- Storage: ~$0.023 per GB/month
- Data transfer out: ~$0.09 per GB
- Requests: ~$0.0004 per 1000 GET requests

**Reduce costs:**
1. Enable versioning only when needed
2. Use S3 lifecycle policies to archive old assets
3. Add CloudFront CDN (caches at edge, reduces S3 requests)

---

## 🔐 Security Best Practices

1. ✅ **Public Access Only**: Current setup allows public read-only access
2. **Use CloudFront**: Add a CDN for additional security
3. **Enable Versioning**: Protect against accidental deletion
4. **Use HTTPS Only**: All S3 URLs use HTTPS automatically
5. **Rotate Credentials**: Change AWS access keys periodically

---

## 📱 Updating Assets in Future

To add new assets:

```bash
# Option 1: Upload single file
aws s3 cp path/to/file s3://ritz-media-assets/assets/

# Option 2: Upload entire folder
aws s3 sync public/assets s3://ritz-media-assets/assets --acl public-read

# Option 3: Delete old assets before uploading
aws s3 rm s3://ritz-media-assets/assets/ --recursive
aws s3 sync public/assets s3://ritz-media-assets/assets --acl public-read
```

---

## 🆘 Need Help?

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS CLI Reference](https://docs.aws.amazon.com/cli/latest/reference/)
- [AWS Support](https://console.aws.amazon.com/support/)

