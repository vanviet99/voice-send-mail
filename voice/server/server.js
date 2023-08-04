
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const cors = require('cors');
const port = 5000;
app.use(bodyParser.urlencoded({ extended: true }));
// const corsOptions = {
//     origin: 'http://localhost:3000', // Đổi thành tên miền của ứng dụng React
//     optionsSuccessStatus: 200,
//   };
// app.use(cors(corsOptions));
app.use(cors())
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const Audio = require('./modal.js/audio')
app.post('/upload', upload.single('audio'), (req, res) => {
  const audioBlob = req.file.buffer;
  const contentType = req.file.mimetype;
  const newAudio = new Audio({
    data: audioBlob,
    contentType: contentType,
  });

  newAudio.save()
  .then(savedAudio => {
    res.json({ audioId: savedAudio._id });
  })
  .catch(error => {
    console.error('Lỗi khi lưu dữ liệu âm thanh:', error);
    res.status(500).send('Server error');
  });
});

app.get('/api/recordings/:id', (req, res) => {
  const audioId = req.params.id;
  Audio.findById(audioId)
    .then(audio => {
      if (!audio) {
        return res.status(404).json({ error: 'Không tìm thấy đoạn ghi âm' });
      }

      res.json({
        base64Data: audio.data.toString('base64'),
        contentType: audio.contentType
      });
    })
    .catch(error => {
      console.error('Lỗi khi truy vấn dữ liệu âm thanh:', error);
      res.status(500).send('Server error');
    });
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
