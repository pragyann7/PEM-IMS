from rest_framework import serializers
from .models import Product, Category


class ProductSerializer(serializers.ModelSerializer):
    # category = serializers.StringRelatedField()
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    # category_id = serializers.PrimaryKeyRelatedField(
    #     queryset=Category.objects.all(), write_only=True
    # )

    class Meta:
        model = Product
        # fields = [
        #     'id', 'name', 'category', 'category_id',
        #     'brand', 'stock', 'purchase_price', 'selling_price', 'image'
        # ]
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'