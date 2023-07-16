# Generated by Django 4.2.2 on 2023-07-14 08:01

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("kidsavings", "0007_remove_user_parent_account"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="role",
            field=models.CharField(
                choices=[("PARENT", "Parent"), ("CHILD", "Child")],
                default="PARENT",
                max_length=50,
            ),
            preserve_default=False,
        ),
    ]
