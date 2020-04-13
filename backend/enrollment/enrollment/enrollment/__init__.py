import pymysql

# fake version_info; this is stupid
pymysql.version_info = (1, 3, 13, "final", 0)
pymysql.install_as_MySQLdb()
