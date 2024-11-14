# from tensorflow.keras.applications.vgg16 import VGG16, preprocess_input
# from tensorflow.keras.preprocessing import image
# import numpy as np

# # Load the VGG16 model pre-trained on ImageNet
# model = VGG16(weights='imagenet', include_top=False)

# def extract_features(img_path):
#     # Load the image and resize to 224x224 pixels (expected input for VGG16)
#     img = image.load_img(img_path, target_size=(224, 224))
#     img_data = image.img_to_array(img)
#     img_data = np.expand_dims(img_data, axis=0)
#     img_data = preprocess_input(img_data)

#     # Extract features
#     features = model.predict(img_data)
#     # Flatten the features to a 1D array
#     return features.flatten()

# feature_extraction.py

#ResNet50
# from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
# from tensorflow.keras.preprocessing import image
# import numpy as np

# # Load the ResNet50 model with pretrained ImageNet weights
# model = ResNet50(weights='imagenet', include_top=False, pooling='avg')  # `pooling='avg'` provides a 2048-D output

# def extract_features(img_path):
#     """
#     Extracts features from an image using ResNet50.
#     """
#     # Load and preprocess the image
#     img = image.load_img(img_path, target_size=(224, 224))
#     img_data = image.img_to_array(img)
#     img_data = np.expand_dims(img_data, axis=0)
#     img_data = preprocess_input(img_data)

#     # Extract features with ResNet50
#     features = model.predict(img_data)
#     return features.flatten()  # Output shape will be (2048,)

# feature_extraction.py 
#EfficientNetB0
# from tensorflow.keras.applications.efficientnet import EfficientNetB0, preprocess_input
# from tensorflow.keras.preprocessing import image
# import numpy as np
# import os

# # Load EfficientNetB0 model with local weights
# local_weights_path = os.path.join("efficientnetb0_notop.h5")
# model = EfficientNetB0(weights=local_weights_path, include_top=False, pooling='avg')

# def extract_features(img_path):
#     img = image.load_img(img_path, target_size=(299, 299))
#     img_data = image.img_to_array(img)
#     img_data = np.expand_dims(img_data, axis=0)
#     img_data = preprocess_input(img_data)
#     features = model.predict(img_data)
#     return features.flatten()


# feature_extraction.py
# EfficientNetB3
# from tensorflow.keras.applications.efficientnet import EfficientNetB3, preprocess_input
# from tensorflow.keras.preprocessing import image
# import numpy as np
# import os

# # Load EfficientNetB3 model with pretrained ImageNet weights
# model = EfficientNetB3(weights='imagenet', include_top=False, pooling='avg')  # `pooling='avg'` provides a 1536-D output

# def extract_features(img_path):
#     """
#     Extracts features from an image using EfficientNetB3.
#     """
#     # Load and preprocess the image with a higher resolution for EfficientNetB3
#     img = image.load_img(img_path, target_size=(300, 300))
#     img_data = image.img_to_array(img)
#     img_data = np.expand_dims(img_data, axis=0)
#     img_data = preprocess_input(img_data)

#     # Extract features using EfficientNetB3
#     features = model.predict(img_data)
#     return features.flatten()  # Output shape will be (1536,)


from tensorflow.keras.applications.efficientnet import EfficientNetB3, preprocess_input
from tensorflow.keras.preprocessing import image
import numpy as np
import os
from sentence_transformers import SentenceTransformer

# Load EfficientNetB3 model with pretrained ImageNet weights
model = EfficientNetB3(weights='imagenet', include_top=False, pooling='avg')  # `pooling='avg'` provides a 1536-D output
tmodel = SentenceTransformer('all-MiniLM-L6-v2')

def extract_features(img_path):
    """
    Extracts features from an image using EfficientNetB3.
    """
    # Load and preprocess the image with a higher resolution for EfficientNetB3
    img = image.load_img(img_path, target_size=(300, 300))
    img_data = image.img_to_array(img)
    img_data = np.expand_dims(img_data, axis=0)
    img_data = preprocess_input(img_data)

    # Extract features using EfficientNetB3
    features = model.predict(img_data)
    return features.flatten()  # Output shape will be (1536,)


def extract_text_features(text):
    return tmodel.encode(text).tolist()  # Convert to list for storage
