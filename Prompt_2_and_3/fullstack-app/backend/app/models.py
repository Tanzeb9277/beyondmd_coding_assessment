from django.db import models

# Create your models here.
class NamedCat(models.Model):
    name                = models.CharField(max_length=80)
    date_named			= models.DateTimeField(verbose_name='date named', auto_now_add=True)
    image_url           = models.TextField()